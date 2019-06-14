import React from 'react'
import { Map, GoogleApiWrapper, Marker, GoogleAPI } from 'google-maps-react'
import { GOOGLE_MAPS_API_KEY } from '../../../config/env'

interface MapProps {
  google: GoogleAPI
}

const MapWrapper: React.FC<MapProps> = props => {
  return (
    <div style={{ height: 400 }}>
      <Map
        google={props.google}
        zoom={8}
        style={{
          width: '100%',
          height: 400,
        }}
        initialCenter={{ lat: 47.6307081, lng: -122.1434325 }}
      >
        <Marker position={{ lat: 47.49855629475769, lng: -122.14184416996333 }} />
        <Marker position={{ lat: 47.359423, lng: -122.021071 }} />
        <Marker position={{ lat: 47.6307081, lng: -122.1434325 }} />
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MapWrapper)
