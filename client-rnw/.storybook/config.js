import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
// import StoryRouter from 'storybook-react-router'
// import apolloStorybookDecorator from 'apollo-storybook-react'
// import gql from 'graphql-tag'
// import '../src/styles'

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  addDecorator(withKnobs)
  addDecorator(withInfo)
  addDecorator(withA11y)
  // addDecorator(StoryRouter())

  // const typeDefs = gql`
  //   type Query {
  //     rates(currency: String!): [Rate]
  //   }

  //   type Rate {
  //     currency: String!
  //     rate: String!
  //   }

  //   schema {
  //     query: Query
  //   }
  // `

  // const mocks = {
  //   Query: () => {
  //     return {
  //       rates: () => {
  //         return [
  //           { currency: 'AED', rate: '3.67' },
  //           { currency: 'ABC', rate: '2.67' },
  //           { currency: 'CDE', rate: '4.67' },
  //         ]
  //       },
  //     }
  //   },
  // }

  // addDecorator(
  //   apolloStorybookDecorator({
  //     typeDefs,
  //     mocks,
  //   })
  // )

  req.keys().forEach(req)
}

configure(loadStories, module)
