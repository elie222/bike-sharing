import * as config from 'config'

export const PORT: number = config.get('PORT')
export const MONGO: {
  URL: string
  SSL?: string
  AUTH_SOURCE?: string
  REPLICA_SET?: string
} = config.get('MONGO')
export const ACCOUNTS_SECRET: string = config.get('ACCOUNTS_SECRET')
export const ENABLE_GRAPHQL_PLAYGROUND: boolean = config.get('ENABLE_GRAPHQL_PLAYGROUND')

export const CLOUDINARY_CLOUD_NAME: string = config.get('CLOUDINARY.CLOUD_NAME')
export const CLOUDINARY_API_KEY: string = config.get('CLOUDINARY.API_KEY')
export const CLOUDINARY_API_SECRET: string = config.get('CLOUDINARY.API_SECRET')
