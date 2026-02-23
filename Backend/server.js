const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/teacher-dashboard")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", dashboardRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));