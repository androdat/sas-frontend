import React, { useEffect, useState } from "react";
import axios from "axios";
const Map = () => {
  const [anomaliesData, setAnomaliesData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

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
    <>
    <div>ds</div>
      {apiErrorMessage && (
        <div>
          <p>{apiErrorMessage}</p>
        </div>
      )}
    </>
  );
};

export default Map;
