import * as React from 'react'
import CameraPhoto from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

interface CameraProps {
  onTakePhoto: (dataUri: string) => void
}

const Camera: React.FunctionComponent<CameraProps> = props => {
  return <CameraPhoto onTakePhoto={props.onTakePhoto} />
}

export default Camera
