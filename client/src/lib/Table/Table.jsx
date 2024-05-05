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

  useEffect(() => {
    handleGetAllData();
  }, []);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      console.log(data);
      setSensorData(prevItems => [...prevItems, data]);
    });
  }, [socket]);

  const handleGetAllData = async () => {
    let resp = await axios.get("http://localhost:4000/sas/getAll");
    console.log(resp.data.sensor);
    setSensorData(resp.data.sensor);
  };

  return (
    <div>
      table
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Fuel</TableCell>
              <TableCell align="right">Power</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
