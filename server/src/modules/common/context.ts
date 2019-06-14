import User from '../user/UserEntity'

export interface Context {
  userId?: string
  user?: User
}
