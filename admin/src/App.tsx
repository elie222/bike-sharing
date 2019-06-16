import React from 'react'
import { Admin, Resource } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
// import { PostCreate, PostEdit, PostList } from './posts'

const App: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState(null)

  React.useEffect(() => {
    const onMount = async () => {
      const provider = await buildGraphQLProvider({
        clientOptions: { uri: 'http://localhost:4000/graphql' },
        // introspection: {
        //   include: ['Bike'],
        // },
      })

      setDataProvider(provider)
    }

    onMount()

    return () => {}
  }, [])

  if (!dataProvider) return <div>Loading</div>

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Bike" />
    </Admin>
  )
}

export default App
