import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AccountsGraphQLClient } from '@accounts/graphql-client'
import { AccountsClientPassword } from '@accounts/client-password'
import { AccountsClient } from '@accounts/client'
import { accountsLink } from '@accounts/apollo-link'
import { Platform } from '@unimodules/core'
import { TokenStorage } from '@accounts/client/lib/types'
import getEnvVars from '../../config/env'

const GRAPHQL_URL = getEnvVars().GRAPHQL_URL

const httpLink = createUploadLink({
  uri: GRAPHQL_URL,
})

const cache = new InMemoryCache()

// accounts js
export const graphQLApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache,
})

export const accountsGraphQL = new AccountsGraphQLClient({
  graphQLClient: graphQLApolloClient,
  // userFieldsFragment: `
  //   fragment userFields on User {
  //     id
  //     username
  //     emails {
  //       address
  //       verified
  //     }
  //     roles
  //   }
  // `,
})

let tokenStorage: TokenStorage

if (Platform.OS !== 'web') {
  tokenStorage = {
    async setItem(key: string, value: string) {
      return await AsyncStorage.setItem(key, value)
    },
    async getItem(key: string) {
      return await AsyncStorage.getItem(key)
    },
    async removeItem(key: string) {
      return await AsyncStorage.removeItem(key)
    },
  }
}

export const accounts = new AccountsClient(
  {
    tokenStorage,
  },
  accountsGraphQL
)

export const accountsPassword = new AccountsClientPassword(accounts)

// regular apollo client
const authLink = accountsLink(() => accounts)

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache,
})
