import { registerEnumType } from 'type-graphql'
import { Role } from './consts'

// see: https://github.com/19majkel94/type-graphql/blob/master/docs/enums.mdimport

registerEnumType(Role, {
  name: 'Role',
})
