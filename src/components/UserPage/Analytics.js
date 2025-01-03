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
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Words Translated",
        data: [300, 500, 400],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const radarData = {
    labels: ["Adventure", "Mystery", "Sci-Fi", "Romance"],
    datasets: [
      {
        label: "Stories",
        data: [5, 7, 3, 8],
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3"],
    datasets: [
      {
        label: "Chat Interactions",
        data: [10, 15, 20],
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Group A", "Group B", "Group C"],
    datasets: [
      {
        label: "Collaboration",
        data: [40, 30, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    datasets: [
      {
        label: "Voice Interactions",
        data: [12, 19, 3, 5],
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
