import React from 'react'
import MapView from 'react-native-maps'

interface MapProps {}

const Map: React.FC<MapProps> = props => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  )
}

export default Map
