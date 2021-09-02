import { useState, useMemo, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

function SetMap({ center }) {
  const map = useMap()
  map.setView(center, 14)
  return null
}

function SetMarker({ setMarkerPosition }) {
  const map = useMapEvents({
    click: (e) => {
      setMarkerPosition(e.latlng)
    },
  })
  return null
}

const SmartMap = () => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 3.1399616034165456, lng: 101.77296128020288 })
  const [center, setCenter] = useState({ lat: 3.1399616034165456, lng: 101.77296128020288 })
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
    <div style={{ height: 800 }}>
      <div>
        <button
          onClick={() => {
            setCenter({ lat: 3.1961499526621866, lng: 101.5967718446333 })
            setMarkerPosition({ lat: 3.1961499526621866, lng: 101.5967718446333 })
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

        <Marker draggable={true} eventHandlers={eventHandlers} position={markerPosition} ref={markerRef}>
          <Popup minWidth={90}>
            <span>This is the Marker</span>
          </Popup>
        </Marker>
        <SetMap center={center} />
        <SetMarker setMarkerPosition={setMarkerPosition} />
      </MapContainer>
    </div>
  )
}

export default SmartMap
