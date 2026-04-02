const app = require("./src/app");
const config = require("./src/config/env.config");
const connectDB = require("./src/config/db.config");

const PORT = process.env.PORT || config.port;

console.log("Starting AI Resume Analyzer Backend...");

// Start server first, then connect to MongoDB in background
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Connect to MongoDB (non-blocking)
connectDB().catch((err) => {
  console.error("MongoDB failed but server is still running.");
});
