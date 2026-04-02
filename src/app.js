const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const resumeRoutes = require("./routes/resume.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Security & utility middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", /\.vercel\.app$/],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Analyzer API is running",
  });
});

// Resume routes
app.use("/api/v1/resume", resumeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
