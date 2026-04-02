if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const config = {
  port: process.env.PORT || 5000,
  groqApiKey: process.env.GROQ_API_KEY,
  mongodbUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
};

module.exports = config;
