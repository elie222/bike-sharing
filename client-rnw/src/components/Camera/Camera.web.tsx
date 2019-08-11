import React from 'react'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

interface CameraProps {}

const PhotoCamera: React.FC<CameraProps> = props => {
  return (
    <Camera
      onTakePhoto={dataUri => {
        console.log('dataUri', dataUri)
      }}
    />
  )
}

export default PhotoCamera
