import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import "./Map.scss";

const TOKEN =
  "pk.eyJ1IjoiYW5kcm9kYXQiLCJhIjoiY2x2dXlreWxzMTNwOTJpbndnamtrNHV1dCJ9.y8E5-32QbG0FErw-j5CJrQ";
const MapCompoent = () => {
  // console.log(process.env.REACT_MAP_TOPEN);
  const [anomaliesData, setAnomaliesData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  useEffect(() => {
    handleGetAllAnomalies();
  }, []);

  const handleGetAllAnomalies = async () => {
    try {
      let resp = await axios.get("http://localhost:4000/sensor/anomalies");
      console.log(resp.data.sensorData);
      setAnomaliesData(resp.data.sensorData);
    } catch (err) {
      console.log("Error fetching sensor data:", err);
      console.log(err.response.data.message);
      setApiErrorMessage(err.response.data.message);
    }
  };
  return (
    // <>
    //   <div className="map-parent">

    //   </div>

    //   {apiErrorMessage && (
    //     <div>
    //       <p>{apiErrorMessage}</p>
    //     </div>
    //   )}
    // </>
    <>
      <div>
        <h1>Map Example</h1>
        <MapComponent />
      </div>
    </>
  );
};

export default MapCompoent;
