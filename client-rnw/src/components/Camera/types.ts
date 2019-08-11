import { CapturedPicture } from 'expo-camera/build/Camera.types'

export interface CameraProps {
  onTakePhoto(photo: CapturedPicture): void
}
