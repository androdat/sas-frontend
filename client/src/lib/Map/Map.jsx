import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import "./Map.scss";

const MapCompoent = ({ socket }) => {
  const [anomaliesData, setAnomaliesData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    handleGetAllAnomalies();
  }, []);

  useEffect(() => {
    socket.on("sensorDataWithAnomalies", ({ eventName, data }) => {
      setApiErrorMessage(null);
      if (eventName === "sensorDataWithAnomalies") {
        setAnomaliesData((prevItems) => [...prevItems, ...data]);
      }
    });
  }, [socket]);

  const handleGetAllAnomalies = async () => {
    setLoader(true);
    try {
      let resp = await axios.get("http://localhost:4000/sensor/anomalies");
      setAnomaliesData(resp.data.sensorData);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setApiErrorMessage(err.response.data.message);
    }
  };
  return (
    <>
      {apiErrorMessage && (
        <div className="err-msg">
          <p>{apiErrorMessage}</p>
        </div>
      )}
      {!apiErrorMessage && !loader && (
        <div className="map-parent">
          <MapComponent anomaliesData={anomaliesData} />
        </div>
      )}
    </>
  );
};

export default MapCompoent;
