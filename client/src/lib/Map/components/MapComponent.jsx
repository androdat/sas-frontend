import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ anomaliesData }) {
  const initialMapLocation = [12.9716, 77.5946];

  return (
    <MapContainer center={initialMapLocation} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {anomaliesData.map((item, index) => (
        <Marker key={index} position={[item.lat, item.lng]}>
          <Popup>
            <div>
              Tower ID: {item.tower_id}
              <br />
              Latitude: {item.lat}
              <br />
              Longitude: {item.lng}
              <br />
              Temperature (°C): {item.temp}
              <br />
              Fuel Status (Liters): {item.fuel}
              <br />
              Power Source: {item.power}
              <br />
              Anomalie:{item.anomalies ? "yes" : "no"}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
