import { AuthChecker } from 'type-graphql'
import { Role } from './consts'

interface Context {
  user?: {
    roles: Role[]
  }
}

export const authChecker: AuthChecker<Context> = ({ context }, roles: Role[]) => {
  const { user } = context

  // if `@Authorized()`, check only is user exist
  if (roles.length === 0) return user !== undefined
  // there are some roles defined now

  // and if no user, restrict access
  if (!user) return false

  if (!user.roles) {
    console.error('user has no roles')
    return false
  }

  if (user.roles.some(role => roles.includes(role))) {
    // grant access if the roles overlap
    return true
  }

  // no roles matched, restrict access
  return false
}
