import { Service } from 'typedi'
import { Arg, Resolver, Query, Authorized, Mutation, Field, InputType, ID, Ctx } from 'type-graphql'
import { UserService } from './UserService'
import { Role } from './consts'
import { accountsPassword } from './accounts'
import User, { Profile } from './UserEntity'
import { Context } from '../common/context'
import './enums'

@InputType()
class ProfileInput implements Partial<Profile> {
  @Field(type => String)
  firstName: string

  @Field(type => String)
  lastName: string
}

@InputType()
class UpdateUserInput implements Partial<User> {
  @Field(type => String, { nullable: true })
  username?: string

  @Field(type => String, { nullable: true })
  email?: string

  @Field(type => String, { nullable: true })
  password?: string

  @Field(type => ProfileInput, { nullable: true })
  profile?: ProfileInput

  @Field(type => String, { nullable: true })
  phone?: string

  // @Field(type => [Role], { nullable: true })
  // roles?: Role[]

  @Field(type => Boolean, { nullable: true })
  isAdmin?: boolean
}

@Service()
@Resolver(User)
export default class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(returns => [User])
  @Authorized(Role.Admin)
  async users() {
    const all = await this.service.find()

    return all
  }

  @Mutation(returns => User)
  @Authorized(Role.Admin)
  async updateUser(
    @Arg('userId', returns => String) userId: string,
    @Arg('user', returns => UpdateUserInput) user: UpdateUserInput,
    @Ctx() ctx: Context
  ) {
    const dbUser = await this.service.findOne(userId)

    if (dbUser.roles.includes(Role.SuperUser) && !ctx.user.roles.includes(Role.SuperUser))
      throw new Error('Only super admin can update super admin.')

    await this.service.update(userId, user)

    return await this.service.findOne(userId)
  }
}
