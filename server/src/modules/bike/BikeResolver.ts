import { Service } from 'typedi'
import { Arg, Resolver, Query, Mutation, InputType, Field, Ctx, Authorized, ID } from 'type-graphql'
import { Context } from '../common/context'
import Bike from './BikeEntity'
import { BikeService } from './BikeService'
import { Role } from '../user/consts'
import { GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '../common/cloudinary'

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

export class FileInput {
  @Field()
  path: string

  @Field()
  filename: string

  @Field()
  mimetype: string
}

@Service()
@Resolver(Bike)
export default class BikeResolver {
  constructor(private readonly service: BikeService) {}

  @Query(returns => Bike, { nullable: true })
  async Bike(@Arg('_id', type => ID) _id: string) {
    const doc = await this.service.findOne(_id)

    return doc
  }

  @Query(returns => [Bike])
  async allBikes() {
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

  @Mutation(returns => Bike)
  async uploadBikePhoto(
    @Arg('bikeId') bikeId: string,
    @Arg('file', type => GraphQLUpload) file: FileInput,
    @Ctx() ctx: Context
  ) {
    const { userId } = ctx
    const uploadedFile = await file

    console.log('uploadedFile', uploadedFile)

    // TODO
    // uploadImage(uploadImage)

    return null
  }
}
