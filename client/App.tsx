import React from 'react'
import { Platform } from 'react-native'
import styled from '@emotion/native'
import { Provider as PaperProvider, Button, Appbar } from 'react-native-paper'
import Map from './src/components/Map/Map'

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

        <Button icon="add-a-photo" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </Container>
    </PaperProvider>
  )
}
