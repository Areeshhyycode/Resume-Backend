const app = require("./src/app");
const config = require("./src/config/env.config");

const PORT = process.env.PORT || config.port;

// Only listen when not on Vercel (Vercel uses serverless)
if (!process.env.VERCEL) {
  const connectDB = require("./src/config/db.config");

  console.log("Starting AI Resume Analyzer Backend...");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
    console.log(`Environment: ${config.nodeEnv}`);
  });

  connectDB().catch((err) => {
    console.error("MongoDB failed but server is still running.");
  });
}

// Export for Vercel serverless
module.exports = app;
