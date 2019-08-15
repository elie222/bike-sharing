import React from 'react'
import { SignIn } from './SignIn'
import { SignInFormData } from './types'
import { useUserContext } from '../../utils/UserContext'

interface Props {}

export function SignInContainer(props: Props) {
  const userContext = useUserContext()

  const onSignInPress = async (data: SignInFormData) => {
    console.log('onSignInPress', data)
    // this.props.navigation.goBack()
    // this.props.navigation.navigate('Home')

    await userContext.signUp(data.email, data.password)
  }

  // const onSignUpPress = () => {
  //   this.props.navigation.navigate({
  //     routeName: 'Sign Up 1',
  //     key: 'SignIn1Container',
  //   })
  // }

  return <SignIn onSignInPress={onSignInPress} onSignUpPress={onSignInPress} />
}
