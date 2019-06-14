import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Role } from './consts'

@ObjectType()
export class Profile {
  @Column()
  @Field(type => String)
  firstName: string

  @Column()
  @Field(type => String)
  lastName: string
}

@ObjectType()
@Entity({ name: 'users' })
export default class User {
  @Field(type => ID)
  @ObjectIdColumn()
  _id: ObjectID

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date

  @Column()
  @Field()
  username: string

  @Column(type => Profile)
  @Field(type => Profile)
  profile: Profile

  @Column()
  @Field(type => [Role])
  roles: Role[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  auditor?: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  ssoLogin?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string
}
