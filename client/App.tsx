import React from 'react'
import { Platform } from 'react-native'
import styled from '@emotion/native'
import { Provider as PaperProvider, Button, Appbar } from 'react-native-paper'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Map from './src/components/Map/Map'
import SignUp from './src/screens/auth/SignUp'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: blue;
`

function PhotoCamera() {
  if (Platform.OS === 'web') {
    return (
      <Camera
        onTakePhoto={dataUri => {
          console.log('dataUri', dataUri)
        }}
      />
    )
  }

  return null
}

export default function App() {
  const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert'

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => console.log('back')} />
        <Appbar.Content title="Title" subtitle={'Subtitle'} />
        <Appbar.Action icon="search" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

      <Map />

      <Appbar>
        <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
      </Appbar>

      <Container>
        <StyledView>
          <StyledText>Styled Text</StyledText>
        </StyledView>

        <SignUp />

        <Button icon="add-a-photo" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>

        <PhotoCamera />
      </Container>
    </PaperProvider>
  )
}
