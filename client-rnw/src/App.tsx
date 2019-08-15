import React from 'react'
import * as Location from 'expo-location'
import { ListRenderItemInfo, View, ScrollView, ImageRequireSource } from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import { registerRootComponent } from 'expo'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from '@emotion/native'
import { mapping, light as lightTheme } from '@eva-design/eva'
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  TopNavigation,
  ListItem,
  List,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten'
import { ReactNativeFile } from 'apollo-upload-client'
import { client } from './utils/apollo'
import Map from './components/Map/Map'
import Camera from './components/Camera/Camera'
import gql from 'graphql-tag'
import { useUploadBikePhotoMutation } from './generated/graphql'
import { SignInContainer } from './screens/auth/SignInContainer'
import { ApplicationLoader, Assets } from './components/appLoader/applicationLoader.component'
import { UserProvider, useUserContext } from './utils/UserContext'

// eslint-disable-next-line
const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadBikePhoto($file: Upload!, $bikeId: String!) {
    uploadBikePhoto(file: $file, bikeId: $bikeId)
  }
`

const images: ImageRequireSource[] = [
  // require('./assets/images/source/image-profile-1.jpg'),
  // require('./assets/images/source/image-profile-2.jpg'),
  // require('./assets/images/source/image-profile-3.jpg'),
  // require('./assets/images/source/image-profile-4.jpg'),
  // require('./assets/images/source/image-profile-5.jpg'),
  // require('./assets/images/source/image-profile-6.jpg'),
  // require('./assets/images/source/image-profile-7.jpg'),
  // require('./assets/images/source/image-profile-8.jpg'),
  // require('./assets/images/source/image-profile-9.jpg'),
  // require('./assets/images/source/image-profile-10.jpg'),
]

const fonts: { [key: string]: number } = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
}

const assets: Assets = {
  images: images,
  fonts: fonts,
}

const Container = styled(Layout)`
  flex: 1;
  background-color: red;
  align-items: center;
`

const AppInner: React.FC<{ navigation: any }> = props => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  const [location, setLocation] = React.useState<Location.LocationData>(null)
  const [uploadBikePhoto] = useUploadBikePhotoMutation()

  const data: string[] = ['Item 1', 'Item 2', 'Item 3']

  return (
    <Container>
      <TopNavigation title="Title" subtitle="Subtitle" />
      <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
        <View style={{ paddingBottom: 30 }}>
          <Text style={{}} category="h4">
            Welcome to my demo app
          </Text>
          <Button onPress={() => props.navigation.navigate('Profile')}>BUTTON</Button>
          <Button
            onPress={async () => {
              await Location.requestPermissionsAsync()

              if (await Location.hasServicesEnabledAsync()) {
                const loc = await Location.getCurrentPositionAsync()
                setLocation(loc)
              }
            }}
          >
            Get Location
          </Button>
          {location && (
            <Text>
              {`Location. Lat: ${location.coords.latitude} Long: ${location.coords.longitude}`}
            </Text>
          )}
        </View>

        <View style={{ height: 400, alignSelf: 'stretch' }}>
          <Camera
            onTakePhoto={async photo => {
              try {
                const file = new ReactNativeFile({
                  uri: photo.uri,
                  type: 'image/png',
                  name: 'i-am-a-name',
                })

                const result = await uploadBikePhoto({
                  variables: {
                    bikeId: 'x123',
                    file,
                  },
                })

                console.log('result', result)
              } catch (error) {
                console.error(error)
              }
            }}
          />
        </View>

        <View style={{ height: 400, alignSelf: 'stretch' }}>
          <Map />
        </View>

        <List
          style={{ height: 400, alignSelf: 'stretch' }}
          data={data}
          renderItem={(info: ListRenderItemInfo<string>) => (
            <ListItem title={info.item} description="Description" onPress={console.log} />
          )}
        />
      </ScrollView>

      <BottomNavigation selectedIndex={selectedTabIndex} onSelect={setSelectedTabIndex}>
        <BottomNavigationTab title="Tab 1" />
        <BottomNavigationTab title="Tab 2" />
        <BottomNavigationTab title="Tab 3" />
      </BottomNavigation>
    </Container>
  )
}
;(AppInner as any).navigationOptions = ({ navigation }) => ({
  title: 'App Inner',
})

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home',
})
;(SignInContainer as any).navigationOptions = ({ navigation }) => ({
  header: null,
})

const AppNavigator = createStackNavigator({
  Home: {
    screen: AppInner,
  },
  Profile: {
    screen: HomeScreen,
  },
})

const AuthNavigator = createStackNavigator({
  SignUp: {
    screen: SignInContainer,
  },
})

const AuthLoadingScreen: React.FC = () => <Text>'Loading...'</Text>

const RootNavigator = (loggedIn: boolean) =>
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: loggedIn ? 'App' : 'Auth',
    }
  )

const AppContainer: React.FC = () => {
  const userContext = useUserContext()

  React.useEffect(() => {
    userContext.getUser()
    return () => {}
  }, [])

  const user = userContext.userState.user
  console.log('AppContainer user', user)

  let Container = createAppContainer(RootNavigator(!!user))

  return <Container />
}

const App: React.FC = () => {
  return (
    <ApplicationLoader assets={assets}>
      <ApolloProvider client={client}>
        <UserProvider>
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <AppContainer />
          </ApplicationProvider>
        </UserProvider>
      </ApolloProvider>
    </ApplicationLoader>
  )
}

export default registerRootComponent(App)
