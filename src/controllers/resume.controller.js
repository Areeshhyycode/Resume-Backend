const FileParserService = require("../services/fileParser.service");
const AIService = require("../services/ai.service");

const analyzeResume = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume file (PDF or DOCX)",
      });
    }

    // Step 1: Extract text from resume (using buffer)
    const resumeText = await FileParserService.parseResume(req.file);

    // Step 2: Analyze with AI
    const analysis = await AIService.analyzeResume(resumeText);

    // Step 3: Send response
    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeResume };
