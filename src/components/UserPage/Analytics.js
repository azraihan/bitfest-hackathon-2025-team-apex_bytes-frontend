// Dashboard.jsx
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Radar, Line, Pie, Doughnut } from "react-chartjs-2";

import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

import { ImStatsBars } from "react-icons/im";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for charts
  const barData = {
    labels: [".", ".", "."],
    datasets: [
      {
        label: "Words Translated",
        data: [10, 20, 40],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const radarData = {
    labels: ["Bengali", "বাংlish", "English", "."],
    datasets: [
      {
        label: "Stories",
        data: [5, 7, 3, 8],
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["PDF", "Normal Chat", "Stories"],
    datasets: [
      {
        label: "Chat Interactions",
        data: [5, 7, 3],
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["English", "Bengali", "বাংlish"],
    datasets: [
      {
        label: "Collaboration",
        data: [1, 5, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const doughnutData = {
    labels: ["English", "Bengali", "বাংlish", "ChatBot"],
    datasets: [
      {
        label: "Voice Interactions",
        data: [1, 10, 5, 7],
        backgroundColor: ["#4BC0C0", "#FF9F40", "#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <>
      <Typography
        sx={{
          fontFamily: CONTENT,
          fontSize: 60,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Your Analytics <ImStatsBars />
      </Typography>

      <Grid container spacing={10} style={{ padding: "40px" }}>
        {/* Top Row */}
        <Grid item xs={6}>
          <Paper
            elevation={8}
            style={{
              padding: "30px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Bar data={barData} />
          </Paper>
          <Typography
            sx={{
              fontFamily: CONTENT,
              fontSize: 16,
              fontWeight: "medium",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Words Translated in Each Month
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={8}
            style={{
              padding: "30px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Radar data={radarData} />
          </Paper>
          <Typography
            sx={{
              fontFamily: CONTENT,
              fontSize: 16,
              fontWeight: "medium",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Genre Distribution of Stories
          </Typography>
        </Grid>
        {/* Center (Middle Graph Centered Horizontally) */}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column", // Stack the graph and caption vertically
            alignItems: "center", // Center horizontally
            margin: "40px 0",
          }}
        >
          <Paper
            elevation={8}
            style={{
              padding: "30px",
              height: "300px",
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Line data={lineData} />
          </Paper>
          <Typography
            sx={{
              fontFamily: CONTENT,
              fontSize: 16,
              fontWeight: "medium",
              textAlign: "center",
              marginTop: "10px", // Add some space between the graph and caption
            }}
          >
            Weekly Chat Interactions
          </Typography>
        </Grid>

        {/* Bottom Row */}
        <Grid item xs={6}>
          <Paper
            elevation={8}
            style={{
              padding: "30px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Pie data={pieData} />
          </Paper>
          <Typography
            sx={{
              fontFamily: CONTENT,
              fontSize: 16,
              fontWeight: "medium",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Collaboration Distribution
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={8}
            style={{
              padding: "30px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Doughnut data={doughnutData} />
          </Paper>
          <Typography
            sx={{
              fontFamily: CONTENT,
              fontSize: 16,
              fontWeight: "medium",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Voice Interactions Throughout the Week
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
