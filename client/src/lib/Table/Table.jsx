import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Table.scss";

const TableComponent = ({ socket }) => {
  const [sensorData, setSensorData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    handleGetAllData();
  }, []);

  useEffect(() => {
    socket.on("sensorData", ({ eventName, data }) => {
      setApiErrorMessage(null);
      if (eventName === "sensorData") {
        setSensorData((prevItems) => [...prevItems, ...data]);
      }
    });
  }, [socket]);

  const handleGetAllData = async () => {
    setLoader(true);
    try {
      let resp = await axios.get("http://localhost:4000/sensor");
      setSensorData(resp.data.sensorData);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setApiErrorMessage(err.response.data.message);
    }
  };

  return (
    <>
      {loader && (
        <div className="loader">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!apiErrorMessage && !loader && (
        <div className="table-parent">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sno</TableCell>
                  <TableCell>Tower ID</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Temperature (°C)</TableCell>
                  <TableCell align="right">Fuel Status (Liters)</TableCell>
                  <TableCell align="right">Power Source</TableCell>
                  <TableCell align="right">Anomaly</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorData?.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tower_id ? row.tower_id : row._id}
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
        <div className="err-msg">
          <p>{apiErrorMessage}</p>
        </div>
      )}
    </>
  );
};

export default TableComponent;
