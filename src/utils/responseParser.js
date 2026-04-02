const { z } = require("zod");

// Zod schema to validate AI response structure
const resumeAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  keywords: z.object({
    found: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  atsScore: z.number().min(0).max(100),
  sections: z.object({
    contact: z.object({ present: z.boolean(), feedback: z.string() }),
    experience: z.object({ present: z.boolean(), feedback: z.string() }),
    education: z.object({ present: z.boolean(), feedback: z.string() }),
    skills: z.object({ present: z.boolean(), feedback: z.string() }),
    projects: z.object({ present: z.boolean(), feedback: z.string() }),
  }),
});

const parseAIResponse = (responseText) => {
  // Remove markdown code blocks if AI wraps response
  let cleaned = responseText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  }
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  const json = JSON.parse(cleaned);
  const validated = resumeAnalysisSchema.parse(json);

  return validated;
};

module.exports = { parseAIResponse, resumeAnalysisSchema };
