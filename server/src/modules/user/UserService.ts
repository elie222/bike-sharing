import { getMongoRepository, ObjectID, FindOneOptions } from 'typeorm'
import { Service } from 'typedi'
import User from './UserEntity'
import { toObjectId } from '../common/mongo'

@Service()
export class UserService {
  private repository = getMongoRepository(User)

  async findOne(_id: string) {
    return this.repository.findOne(_id)
  }

  async findOneBySelector(selector?: FindOneOptions<User> | Partial<User>) {
    return this.repository.findOne(selector)
  }

  async find(selector?: Partial<User>) {
    return this.repository.find(selector)
  }

  async create(entity: any) {
    return this.repository.save(entity)
  }

  async update(_id: string | ObjectID, entity: Partial<User>) {
    return this.repository.findOneAndUpdate({ _id: toObjectId(_id) }, { $set: entity })
  }

  async remove(_id: string) {
    let entityToRemove = await this.repository.findOne(_id)
    await this.repository.remove(entityToRemove)
  }
}
