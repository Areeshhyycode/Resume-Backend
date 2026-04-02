const groq = require("../config/gemini.config");
const { buildPrompt } = require("../utils/promptBuilder");
const { parseAIResponse } = require("../utils/responseParser");

class AIService {
  static async analyzeResume(resumeText) {
    const prompt = buildPrompt(resumeText);

    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
    });

    const response = result.choices[0].message.content;
    const parsed = parseAIResponse(response);
    return parsed;
  }
}

module.exports = AIService;
