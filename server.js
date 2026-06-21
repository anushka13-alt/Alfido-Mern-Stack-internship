
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Task Management API is running...");
});


const PORT = process.env.PORT || 3000;

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected Route Access Granted",
    user: req.user,
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});