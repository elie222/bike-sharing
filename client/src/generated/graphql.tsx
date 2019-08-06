import gql from 'graphql-tag'

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type AuthenticateParamsInput = {
  access_token?: Maybe<Scalars['String']>
  access_token_secret?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  user?: Maybe<UserInput>
  code?: Maybe<Scalars['String']>
}

export type Bike = {
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  icon?: Maybe<Scalars['String']>
}

export type CreateBikeInput = {
  name: Scalars['String']
  icon?: Maybe<Scalars['String']>
}

export type CreateUserInput = {
  profile: CreateUserProfileInput
  roles?: Maybe<Array<Scalars['String']>>
  username?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
}

export type CreateUserProfileInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type EmailRecord = {
  address?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
}

export type ImpersonateReturn = {
  authorized?: Maybe<Scalars['Boolean']>
  tokens?: Maybe<Tokens>
  user?: Maybe<User>
}

export type LoginResult = {
  sessionId?: Maybe<Scalars['String']>
  tokens?: Maybe<Tokens>
}

export type Mutation = {
  createUser?: Maybe<Scalars['ID']>
  verifyEmail?: Maybe<Scalars['Boolean']>
  resetPassword?: Maybe<LoginResult>
  sendVerificationEmail?: Maybe<Scalars['Boolean']>
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']>
  changePassword?: Maybe<Scalars['Boolean']>
  twoFactorSet?: Maybe<Scalars['Boolean']>
  twoFactorUnset?: Maybe<Scalars['Boolean']>
  impersonate?: Maybe<ImpersonateReturn>
  refreshTokens?: Maybe<LoginResult>
  logout?: Maybe<Scalars['Boolean']>
  authenticate?: Maybe<LoginResult>
  updateUser: User
  createBike: Bike
  updateBike: Bike
  deleteBike: Scalars['Boolean']
  uploadBikePhoto: Bike
}

export type MutationCreateUserArgs = {
  user: CreateUserInput
}

export type MutationVerifyEmailArgs = {
  token: Scalars['String']
}

export type MutationResetPasswordArgs = {
  token: Scalars['String']
  newPassword: Scalars['String']
}

export type MutationSendVerificationEmailArgs = {
  email: Scalars['String']
}

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']
}

export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type MutationTwoFactorSetArgs = {
  secret: TwoFactorSecretKeyInput
  code: Scalars['String']
}

export type MutationTwoFactorUnsetArgs = {
  code: Scalars['String']
}

export type MutationImpersonateArgs = {
  accessToken: Scalars['String']
  username: Scalars['String']
}

export type MutationRefreshTokensArgs = {
  accessToken: Scalars['String']
  refreshToken: Scalars['String']
}

export type MutationAuthenticateArgs = {
  serviceName: Scalars['String']
  params: AuthenticateParamsInput
}

export type MutationUpdateUserArgs = {
  user: UpdateUserInput
  userId: Scalars['String']
}

export type MutationCreateBikeArgs = {
  data: CreateBikeInput
}

export type MutationUpdateBikeArgs = {
  data: UpdateBikeInput
  _id: Scalars['String']
}

export type MutationDeleteBikeArgs = {
  _id: Scalars['String']
}

export type MutationUploadBikePhotoArgs = {
  file: Scalars['Upload']
  bikeId: Scalars['String']
}

export type Profile = {
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type ProfileInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type Query = {
  twoFactorSecret?: Maybe<TwoFactorSecretKey>
  getUser?: Maybe<User>
  users: Array<User>
  Bike?: Maybe<Bike>
  allBikes: Array<Bike>
}

export type QueryBikeArgs = {
  _id: Scalars['ID']
}

export enum Role {
  SuperUser = 'SuperUser',
  Admin = 'Admin',
  ReadOnly = 'ReadOnly',
}

export type Tokens = {
  refreshToken?: Maybe<Scalars['String']>
  accessToken?: Maybe<Scalars['String']>
}

export type TwoFactorSecretKey = {
  ascii?: Maybe<Scalars['String']>
  base32?: Maybe<Scalars['String']>
  hex?: Maybe<Scalars['String']>
  qr_code_ascii?: Maybe<Scalars['String']>
  qr_code_hex?: Maybe<Scalars['String']>
  qr_code_base32?: Maybe<Scalars['String']>
  google_auth_qr?: Maybe<Scalars['String']>
  otpauth_url?: Maybe<Scalars['String']>
}

export type TwoFactorSecretKeyInput = {
  ascii?: Maybe<Scalars['String']>
  base32?: Maybe<Scalars['String']>
  hex?: Maybe<Scalars['String']>
  qr_code_ascii?: Maybe<Scalars['String']>
  qr_code_hex?: Maybe<Scalars['String']>
  qr_code_base32?: Maybe<Scalars['String']>
  google_auth_qr?: Maybe<Scalars['String']>
  otpauth_url?: Maybe<Scalars['String']>
}

export type UpdateBikeInput = {
  name: Scalars['String']
  icon?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  profile?: Maybe<ProfileInput>
  phone?: Maybe<Scalars['String']>
  isAdmin?: Maybe<Scalars['Boolean']>
}

export type User = {
  id: Scalars['ID']
  emails?: Maybe<Array<EmailRecord>>
  username?: Maybe<Scalars['String']>
  _id: Scalars['ID']
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  profile: Profile
  roles: Array<Role>
  phone?: Maybe<Scalars['String']>
}

export type UserInput = {
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}
