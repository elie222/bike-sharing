import { ObjectID } from 'mongodb'

export const toObjectId = (value: string | ObjectID): ObjectID => {
  return typeof value === 'string' ? new ObjectID(value) : value
}
