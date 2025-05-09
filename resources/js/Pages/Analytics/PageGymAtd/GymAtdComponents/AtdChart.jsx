import React from "react";
import { Line } from "react-chartjs-2";
import classes from "../GymAtd.module.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function AtdChart() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [graphData, setGraphData] = useState([]);
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/analytics/monthlyCheckIn/${selectedYear}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        let monthlyData = new Array(12).fill(0);

        data.checkInUser.forEach(({ month, total }) => {
          monthlyData[month - 1] = total; 
        });
  
        setGraphData(monthlyData);      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [selectedYear]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Active Members",
        data: graphData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className={classes.middleSection}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <p style={{ marginLeft: "25px", fontSize: "20px", fontWeight: 450 }}>
          Monthly Member Check-Ins | {selectedYear}
        </p>
        <div style={{ marginLeft: "25px", marginRight: "25px" }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="YearGymAtd">Year</InputLabel>
              <Select
                labelId="YearGymAtd"
                id="year-select"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className={classes.chart}>
        <Line data={data} options={options} style={{ height: "250px" }}></Line>
      </div>
    </div>
  );
}

export default AtdChart;
