const buildPrompt = (resumeText) => {
  return `
You are an expert resume/CV analyzer and career consultant. Analyze the following resume text and provide a detailed evaluation.

RESUME TEXT:
"""
${resumeText}
"""

Respond ONLY in valid JSON format with this exact structure:
{
  "score": <number 0-100>,
  "summary": "<brief 2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", ...],
  "keywords": {
    "found": ["<keyword found in resume>", ...],
    "missing": ["<important keyword missing>", ...]
  },
  "atsScore": <number 0-100>,
  "sections": {
    "contact": { "present": <boolean>, "feedback": "<feedback>" },
    "experience": { "present": <boolean>, "feedback": "<feedback>" },
    "education": { "present": <boolean>, "feedback": "<feedback>" },
    "skills": { "present": <boolean>, "feedback": "<feedback>" },
    "projects": { "present": <boolean>, "feedback": "<feedback>" }
  }
}

IMPORTANT RULES:
- For "keywords.missing": ONLY suggest keywords that are DIRECTLY relevant to the candidate's field/role mentioned in the resume. Do NOT suggest generic keywords like "Agile", "Cloud computing", "Cybersecurity", "Data analytics", "Team management" unless they are specifically relevant to the candidate's target role. Suggest specific technical skills, tools, or frameworks that are commonly expected for their role.
- For "keywords.found": List the actual technical and professional keywords found in the resume.
- Be strict but constructive. Focus on ATS compatibility, clarity, impact, and modern resume best practices.
Do NOT include any text outside the JSON object.
`;
};

module.exports = { buildPrompt };
