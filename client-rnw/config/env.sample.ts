import { Constants } from 'expo'
import { Platform } from 'react-native'

const localhost =
  Platform.OS === 'ios' ? 'http://localhost:4000/graphql' : 'http://10.0.2.2:4000/graphql'

const ENV = {
  dev: {
    GRAPHQL_URL: localhost,
  },
  staging: {
    GRAPHQL_URL: '[your.staging.api.here]',
  },
  prod: {
    GRAPHQL_URL: '[your.production.api.here]',
  },
}

const getEnvVars = (env: string = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev
  } else if (env === 'staging') {
    return ENV.staging
  } else if (env === 'prod') {
    return ENV.prod
  }
}

export default getEnvVars
