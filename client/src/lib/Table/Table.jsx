import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComponent = ({ socket }) => {
  const [sensorData, setSensorData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(false);

  useEffect(() => {
    handleGetAllData();
  }, []);

  useEffect(() => {
    socket.on("sensorData", ({ eventName, data }) => {
      setApiErrorMessage(null);
      if (eventName === "sensorData") {
        console.log(data);
        setSensorData((prevItems) => [...prevItems, ...data]);
      }
      if (eventName === "powerAnomalie") {
        console.log("data from 3rd anomalie", data);
        let updatedData = data;
        //update prev data
        console.log("updating prev values in table state variable");
        setSensorData(prevData =>
          prevData.map(item => {
            const updatedItem = updatedData.find(updated => updated._id === item._id);
            return updatedItem ? { ...item, anomalies: updatedItem.anomalies } : item;
          })
        );
      }
    });
  }, [socket]);

  const handleGetAllData = async () => {
    console.log("Runnning handleGetAllData .....");
    try {
      let resp = await axios.get("http://localhost:4000/sensor");
      console.log(resp.data.sensorData);
      setSensorData(resp.data.sensorData);
    } catch (err) {
      console.log("Error fetching sensor data:", err);
      console.log(err.response.data.message);
      setApiErrorMessage(err.response.data.message);
    }
  };

  return (
    <>
      {!apiErrorMessage && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tower ID</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Temperature (°C)</TableCell>
                  <TableCell align="right">Fuel Status (Liters)</TableCell>
                  <TableCell align="right">Power Source</TableCell>
                  <TableCell align="right">Anomalie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorData?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">{row.lat}</TableCell>
                    <TableCell align="right">{row.lng}</TableCell>
                    <TableCell align="right">{row.temp}</TableCell>
                    <TableCell align="right">{row.fuel}</TableCell>
                    <TableCell align="right">{row.power}</TableCell>
                    <TableCell align="right">
                      {row.anomalies ? "YES" : "NO"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {apiErrorMessage && (
        <div>
          <p>{apiErrorMessage}</p>
        </div>
      )}
    </>
  );
};

export default TableComponent;
