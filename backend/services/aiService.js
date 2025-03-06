const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const analyzeMessage = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze the sentiment of the following message and provide a short summary:\n\n"${message}"\n\nReturn the sentiment as Positive, Neutral, or Negative, followed by a brief explanation.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "AI analysis failed.";
  }
};

module.exports = analyzeMessage;
