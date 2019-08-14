import React from 'react'
import { Platform, ListRenderItemInfo, StatusBar, View, ScrollView } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
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
import Constants from 'expo-constants'
import { ReactNativeFile } from 'apollo-upload-client'
import { client } from './utils/apollo'
import Map from './components/Map/Map'
import Camera from './components/Camera/Camera'
import gql from 'graphql-tag'
import { useUploadBikePhotoMutation } from './generated/graphql'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import SignUp from './src/screens/auth/SignUp'

// eslint-disable-next-line
const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadBikePhoto($file: Upload!, $bikeId: String!) {
    uploadBikePhoto(file: $file, bikeId: $bikeId)
  }
`

const Container = styled(Layout)`
  flex: 1;
  background-color: red;
  align-items: center;
`

const AppInner: React.FC = props => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  const [uploadBikePhoto] = useUploadBikePhotoMutation()

  const data: string[] = ['Item 1', 'Item 2', 'Item 3']

  return (
    <>
      <Container>
        <TopNavigation title="Title" subtitle="Subtitle" />
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={{}} category="h4">
              Welcome to my demo app
            </Text>
            <Button onPress={() => props.navigation.navigate('Profile')}>BUTTON</Button>
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
    </>
  )
}

AppInner.navigationOptions = ({ navigation }) => ({
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

const AppNavigator = createStackNavigator({
  Home: {
    screen: AppInner,
  },
  Profile: {
    screen: HomeScreen,
  },
})

const AppContainer = createAppContainer(AppNavigator)

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        {/* <View
          style={{
            height: Platform.select({
              ios: Constants.statusBarHeight,
              android: 0,
            }),
          }}
        >
          <StatusBar barStyle={'default'} />
        </View> */}
        <AppContainer />
      </ApplicationProvider>
    </ApolloProvider>
  )
}

export default registerRootComponent(App)
