import * as React from 'react'
import { User } from '../generated/graphql'
import { accounts, accountsGraphQL, accountsPassword } from './apollo'
// import { User as AccountsUser } from '@accounts/types';

interface UserState {
  user?: User
  loggingIn: boolean
}

interface UserContext {
  userState: UserState
  setUserState: (userState: UserState) => void
  getUser: () => void
  signUp: (email: string, password: string) => Promise<any>
  logIn: (email: string, password: string) => Promise<any>
  logOut: () => void
}

const initialState = { user: undefined, loggingIn: true }

export const UserContext = React.createContext<UserContext>({
  userState: initialState,
  setUserState: () => {},
  getUser: () => {},
  signUp: async () => {},
  logIn: async () => {},
  logOut: () => {},
})

export const UserProvider: React.FunctionComponent<{}> = props => {
  const [userState, setUserState] = React.useState<UserState>(initialState)

  const getUser = async () => {
    let user: any = null

    try {
      user = await accountsGraphQL.getUser()
      console.log('!!!!!!!user', user)
    } catch (error) {
      console.error('There was an error logging in.', error)
    } finally {
      setUserState({ user: user && { ...user, _id: user.id }, loggingIn: false })
    }
  }

  const logIn = async (email: string, password: string): Promise<any> => {
    try {
      await accountsPassword.login({ password, user: { email } })
      await getUser()
    } catch (error) {
      console.error(error)
      return error
    }
  }

  const logOut = async () => {
    await accountsGraphQL.logout()

    setUserState({ user: undefined, loggingIn: false })
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        getUser,
        signUp: async (email: string, password: string) => {
          await accountsPassword.createUser({
            password,
            email,
            // profile: { firstName: username, lastName: username }, // TODO
          })

          await logIn(email, password)
        },
        logIn,
        logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)
