import React from 'react'
import { Platform, ListRenderItemInfo, StatusBar, View, ScrollView } from 'react-native'
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
import Map from './src/components/Map/Map'
import Camera from './src/components/Camera/Camera'
// import SignUp from './src/screens/auth/SignUp'

const Container = styled(Layout)`
  flex: 1;
  background-color: red;
  align-items: center;
`

export default function App() {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

  const data: string[] = ['Item 1', 'Item 2', 'Item 3']

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <View
        style={{
          height: Platform.select({
            ios: Constants.statusBarHeight,
            android: 0,
          }),
        }}
      >
        <StatusBar barStyle={'default'} />
      </View>
      <Container>
        <TopNavigation title="Title" subtitle="Subtitle" />
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={{ marginVertical: 16 }} category="h4">
              Welcome to my demo app
            </Text>
            <Button onPress={() => 'onclicktopbutton'}>BUTTON</Button>
          </View>

          <View style={{ height: 400, alignSelf: 'stretch' }}>
            <Camera />
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
    </ApplicationProvider>
  )
}
