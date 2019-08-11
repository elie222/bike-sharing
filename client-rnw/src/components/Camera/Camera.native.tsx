import React from 'react'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { View, Text, TouchableOpacity } from 'react-native'

interface CameraProps {}

const PhotoCamera: React.FC<CameraProps> = props => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)

  React.useEffect(() => {
    const askForPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setHasCameraPermission(status === Permissions.PermissionStatus.GRANTED)
    }

    askForPermission()

    return () => {}
  }, [])

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={cameraType}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setCameraType(
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }
}

export default PhotoCamera
