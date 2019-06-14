import { getMongoRepository, ObjectID, FindOneOptions, FindManyOptions } from 'typeorm'
import { Service } from 'typedi'
import Bike from './BikeEntity'
import { toObjectId } from '../common/mongo'

@Service()
export class BikeService {
  private repository = getMongoRepository(Bike)

  async findOne(_id: string) {
    return this.repository.findOne(_id)
  }

  async findOneBySelector(selector?: FindOneOptions<Bike> | Partial<Bike>) {
    return this.repository.findOne(selector)
  }

  async find(selector?: FindManyOptions<Bike> | Partial<Bike>) {
    return this.repository.find(selector)
  }

  async update(_id: string | ObjectID, entity: Partial<Bike>) {
    return this.repository.findOneAndUpdate({ _id: toObjectId(_id) }, { $set: entity })
  }

  async create(entity: Partial<Bike>) {
    return this.repository.save(entity)
  }

  async remove(_id: string) {
    let entityToRemove = await this.repository.findOne(_id)
    await this.repository.remove(entityToRemove)
  }
}
