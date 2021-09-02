import { useState, useMemo, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

function SetMap({ smartMapLocation }) {
  console.log('setmap')
  const map = useMap()
  map.setView(smartMapLocation, map._zoom)
  return null
}

const center = { lat: 3.1399616034165456, lng: 101.77296128020288 }
const SmartMap = () => {
  const [smartMapLocation, setSmartMapLocation] = useState(center)

  return (
    <div style={{ height: 800 }}>
      <div>
        <button
          onClick={() => {
            setSmartMapLocation({ lat: 3.1961499526621866, lng: 101.5967718446333 })
          }}
        >
          Change Location
        </button>
      </div>
      <MapContainer center={center} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <MapMarker />
        <SetMap smartMapLocation={smartMapLocation} />
      </MapContainer>
    </div>
  )
}

export default SmartMap

function SetMarker({ setMarkerPosition }) {
  const map = useMapEvents({
    click: (e) => {
      setMarkerPosition(e.latlng)
    },
  })
  return null
}

function MapMarker() {
  const [markerPosition, setMarkerPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setMarkerPosition(marker.getLatLng())
        }
      },
    }),
    []
  )
  return (
    <>
      <Marker draggable={true} eventHandlers={eventHandlers} position={markerPosition} ref={markerRef}>
        <Popup minWidth={90}>
          <span>This is the Marker</span>
        </Popup>
      </Marker>
      <SetMarker setMarkerPosition={setMarkerPosition} />
    </>
  )
}
