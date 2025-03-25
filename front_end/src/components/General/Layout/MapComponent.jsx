import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultLocation = {  lat: 21.0285, lng: 105.8542 };

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(defaultLocation);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(newPosition);
        if (onLocationSelect) onLocationSelect(newPosition);
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Vị trí đã chọn: {position.lat}, {position.lng}</Popup>
      </Marker>
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;
