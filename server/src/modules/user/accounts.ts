import MongoDBInterface from '@accounts/mongo'
import { AccountsModule } from '@accounts/graphql-api'
import { DatabaseManager } from '@accounts/database-manager'
import { AccountsServer } from '@accounts/server'
import { AccountsPassword } from '@accounts/password'
import { ACCOUNTS_SECRET } from '../common/consts'

export const accountsPassword = new AccountsPassword({
  validateNewUser: user => {
    console.log('validateNewUser', user)

    return user
  },
})

export const setUpAccounts = (connection: any) => {
  const userStorage = new MongoDBInterface(connection)

  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage,
  })

  const accountsServer = new AccountsServer(
    { db: accountsDb, tokenSecret: ACCOUNTS_SECRET },
    {
      password: accountsPassword,
    }
  )

  const accountsGraphQL = AccountsModule.forRoot({
    accountsServer,
  })

  return { accountsGraphQL, accountsServer }
}

export const userTypeDefs = `
  # Our custom fields to add to the user
  extend input CreateUserInput {
    profile: CreateUserProfileInput!
    roles: [String!]
  }
  input CreateUserProfileInput {
    firstName: String!
    lastName: String!
  }
`
