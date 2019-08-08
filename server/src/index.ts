import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as mongoose from 'mongoose'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { mergeResolvers, mergeTypeDefs, mergeSchemas } from 'graphql-toolkit'
import UserResolver from './modules/user/UserResolver'
import { PORT, MONGO, ENABLE_GRAPHQL_PLAYGROUND } from './modules/common/consts'
import { authChecker } from './modules/user/authChecker'
import { setUpAccounts, userTypeDefs } from './modules/user/accounts'
import BikeResolver from './modules/bike/BikeResolver'

createConnection({
  type: 'mongodb',
  url: MONGO.URL,
  ssl: MONGO.SSL,
  authSource: MONGO.AUTH_SOURCE,
  replicaSet: MONGO.REPLICA_SET,
  useNewUrlParser: true,
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
})
  .then(async connection => {
    const mongooseConnection = await mongoose.connect(MONGO.URL, { useNewUrlParser: true })

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
    app.use(bodyParser.json({ limit: '10mb' }))
    server.applyMiddleware({ app })

    await app.listen({ port: PORT })

    console.log(`🚀 Server ready at ${PORT}`)
  })
  .catch(error => console.error(error))
