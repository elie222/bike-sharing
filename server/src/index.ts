import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import * as mongoose from 'mongoose'
import * as fs from 'fs'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import * as express from 'express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { mergeResolvers, mergeTypeDefs, mergeSchemas } from 'graphql-toolkit'
import UserResolver from './modules/user/UserResolver'
import {
  PORT,
  TYPEORM_HOST,
  TYPEORM_DATABASE,
  ENABLE_GRAPHQL_PLAYGROUND,
} from './modules/common/consts'
import { authChecker } from './modules/user/authChecker'
import { setUpAccounts, userTypeDefs } from './modules/user/accounts'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import BikeResolver from './modules/bike/BikeResolver'

createConnection(
  process.env.NODE_ENV === 'production'
    ? undefined
    : {
        type: 'mongodb',
        host: TYPEORM_HOST,
        database: TYPEORM_DATABASE,
        synchronize: true,
        logging: false,
        entities: ['src/**/*Entity.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      }
)
  .then(async connection => {
    const connectionOptions = (await getConnectionOptions()) as MongoConnectionOptions
    // console.log('connectionOptions', connectionOptions)

    const mongoUrl = `mongodb://${TYPEORM_HOST}:${connectionOptions.port || 27017}/${
      connectionOptions.database
    }`

    console.log('mongoUrl', mongoUrl)

    const mongooseConnection = await mongoose.connect(mongoUrl)

    const typeGraphqlResolvers = [UserResolver, BikeResolver]

    const typeGraphqlSchema = await buildSchema({
      resolvers: typeGraphqlResolvers,
      container: Container,
      validate: false,
      emitSchemaFile: true,
      authChecker,
    })

    const { accountsGraphQL, accountsServer } = setUpAccounts(mongooseConnection.connection)

    const schema = makeExecutableSchema({
      typeDefs: mergeTypeDefs([userTypeDefs, accountsGraphQL.typeDefs]),
      resolvers: mergeResolvers([accountsGraphQL.resolvers]),
      schemaDirectives: {
        ...accountsGraphQL.schemaDirectives,
      },
    })

    const server = new ApolloServer({
      schema: mergeSchemas({
        schemas: [schema, typeGraphqlSchema],
      }),
      // to force these to be enabled in production this can be set to `true`
      introspection: ENABLE_GRAPHQL_PLAYGROUND,
      playground: ENABLE_GRAPHQL_PLAYGROUND,
      uploads: {
        maxFileSize: 10 * 1000 * 1000, // 10 MB
        maxFiles: 10,
      },
      context: accountsGraphQL.context,
      formatError: error => {
        console.error(error)
        console.error('Stacktrace:')
        console.error(
          error.extensions && error.extensions.exception && error.extensions.exception.stacktrace
        )
        return error
      },
    })

    const app = express()
    server.applyMiddleware({ app })

    await new Promise((resolve, reject) => {
      const uploadFilesPath = `${__dirname}/../files`
      fs.access(uploadFilesPath, err => {
        if (err) {
          fs.mkdir(uploadFilesPath, err => {
            if (err) return reject(err)
            return resolve()
          })
        } else {
          resolve()
        }
      })
    })

    await app.listen({ port: PORT })

    console.log(`🚀 Server ready at ${PORT}`)
  })
  .catch(error => console.error(error))
