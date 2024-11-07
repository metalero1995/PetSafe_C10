import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function LocationMarker({ onClick, position = null }) {
  const map = useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });

  return !position?.lat ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


export default function Map({ label, errors, setValue, value }) {
  const handleClick = (position) => {
    setValue(position);
  }

  return(
    <div
      className="space-y-2"
    >
      <label
        className="block font-medium text-sm text-gray-700"
      >{label}</label>
      <MapContainer 
        center={[18.51413, -88.30381]} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '200px', width: '100%' }}
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onClick={handleClick} position={value}/>
      </MapContainer>
      {errors && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
    </div>
  )
}