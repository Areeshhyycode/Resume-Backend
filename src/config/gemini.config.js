const getGroqClient = () => {
  const Groq = require("groq-sdk");
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

module.exports = getGroqClient;
