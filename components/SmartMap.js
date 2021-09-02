import { useState, useMemo, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

const center = {
  lat: 3.1399616034165456,
  lng: 101.77296128020288,
}

const SmartMap = () => {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )
  return (
    <div style={{ height: 800 }}>
      {JSON.stringify(position)}
      <MapContainer center={center} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}>
          <Popup minWidth={90}>
            <span>This is the Marker</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default SmartMap
