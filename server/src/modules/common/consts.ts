import * as config from 'config'

export const PORT: number = config.get('PORT')
export const TYPEORM_HOST: string = config.get('TYPEORM_HOST')
export const TYPEORM_DATABASE: string = config.get('TYPEORM_DATABASE')
export const ACCOUNTS_SECRET: string = config.get('ACCOUNTS_SECRET')
export const ENABLE_GRAPHQL_PLAYGROUND: boolean = config.get('ENABLE_GRAPHQL_PLAYGROUND')
