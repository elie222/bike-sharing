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

  @Field(type => String, { nullable: true })
  ssoLogin?: string

  @Field(type => Boolean, { defaultValue: false })
  auditor?: boolean

  // @Field(type => [Role], { nullable: true })
  // roles?: Role[]

  @Field(type => Boolean, { nullable: true })
  isAdmin?: boolean
}

@InputType()
class AdminCreateUserInput implements Partial<User> {
  @Field(type => String)
  username: string

  @Field(type => String)
  email: string

  @Field(type => String)
  password: string

  @Field(type => ProfileInput)
  profile: ProfileInput

  @Field(type => String, { nullable: true })
  phone?: string

  @Field(type => String, { nullable: true })
  ssoLogin?: string

  @Field(type => Boolean, { defaultValue: false })
  auditor: boolean

  // @Field(type => [Role])
  // roles: Role[]

  @Field(type => Boolean)
  isAdmin: boolean
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

  @Query(returns => [User])
  async auditors() {
    return await this.service.find({ auditor: true })
  }

  // this overrides accounts js `createUser` function
  @Mutation(returns => ID)
  async createUser(@Arg('user', returns => AdminCreateUserInput) user: AdminCreateUserInput) {
    const users = await this.service.find()

    // if we already have a user in the system, disable sign up using this method.
    if (users.length) {
      throw new Error(
        'Please use adminCreateUser to create a new user. Regular sign up is disabled.'
      )
    }

    // create admin super user

    const createdUserId = await accountsPassword.createUser({
      ...user,
      // give super user all roles
      roles: [Role.SuperUser, Role.Admin, Role.ReadOnly],
    })

    return createdUserId
  }

  @Mutation(returns => User)
  @Authorized(Role.Admin)
  async adminCreateUser(@Arg('user', returns => AdminCreateUserInput) user: AdminCreateUserInput) {
    const createdUserId = await accountsPassword.createUser({
      ...user,
      roles: user.isAdmin ? [Role.Admin, Role.ReadOnly] : [Role.ReadOnly],
    })

    const createdUser = await this.service.findOne(createdUserId)

    return createdUser
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
