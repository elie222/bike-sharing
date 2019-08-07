import React from 'react'
import gql from 'graphql-tag'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './utils/apollo'
import Camera from './components/Camera'
import { useUploadBikePhotoMutation } from './generated/graphql'

// eslint-disable-next-line
const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadBikePhoto($file: Upload!, $bikeId: String!) {
    uploadBikePhoto(file: $file, bikeId: $bikeId)
  }
`

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <h2>Photo Upload</h2>
      <PhotoUpload />
    </ApolloProvider>
  )
}

const PhotoUpload: React.FC = () => {
  const [uploadBikePhoto] = useUploadBikePhotoMutation()

  return (
    <Camera
      onTakePhoto={async dataUri => {
        const result = await uploadBikePhoto({
          variables: {
            bikeId: '',
            file: dataUri,
          },
        })

        console.log('result', result)
      }}
    />
  )
}

export default App
