const config = require("../config/env.config");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size too large. Maximum 5MB allowed.",
    });
  }

  // Multer file type error
  if (err.message === "Only PDF and DOCX files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
