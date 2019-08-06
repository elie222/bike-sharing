import * as React from 'react'
import CameraPhoto from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

interface CameraProps {}

const Camera: React.FunctionComponent<CameraProps> = props => {
  return (
    <CameraPhoto
      onTakePhoto={(dataUri: string) => {
        console.log('dataUri', dataUri)
      }}
    />
  )
}

export default Camera
