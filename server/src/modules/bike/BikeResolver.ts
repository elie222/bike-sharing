import { Service } from 'typedi'
import { Arg, Resolver, Query, Mutation, InputType, Field, Ctx, Authorized } from 'type-graphql'
import { Context } from '../common/context'
import Bike from './BikeEntity'
import { BikeService } from './BikeService'
import { Role } from '../user/consts'

@Service()
@Resolver(Bike)
export default class BikeResolver {
  constructor(private readonly service: BikeService) {}

  @Query(returns => Bike, { nullable: true })
  async bike(@Arg('_id') _id: string) {
    const doc = await this.service.findOne(_id)

    return doc
  }

  @Query(returns => [Bike])
  async bikes() {
    const all = await this.service.find()

    return all
  }

  @Authorized(Role.Admin)
  @Mutation(returns => Bike)
  async createBike(
    @Arg('data', type => CreateBikeInput) data: CreateBikeInput,
    @Ctx() ctx: Context
  ) {
    const res = await this.service.create(data)

    return res
  }

  @Authorized(Role.Admin)
  @Mutation(returns => Bike)
  async updateBike(
    @Arg('_id', type => String) _id: string,
    @Arg('data', type => UpdateBikeInput) data: UpdateBikeInput,
    @Ctx() ctx: Context
  ) {
    const res = await this.service.update(_id, data)

    return this.service.findOne(_id)
  }

  @Authorized(Role.Admin)
  @Mutation(returns => Boolean)
  async deleteBike(@Arg('_id', type => String) _id: string, @Ctx() ctx: Context) {
    await this.service.remove(_id)

    return true
  }
}

@InputType()
class CreateBikeInput implements Partial<Bike> {
  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string
}

@InputType()
class UpdateBikeInput implements Partial<Bike> {
  @Field()
  name?: string

  @Field({ nullable: true })
  icon?: string
}
