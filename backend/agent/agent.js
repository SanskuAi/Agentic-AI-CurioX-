const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// AI ANALYSIS

async function analyzeReport(problem, location) {

  const prompt = `
You are an infrastructure problem analysis agent.

Analyze this report:

Problem:
${problem}

Location:
${location}

Return ONLY valid JSON:

{
  "category": "",
  "priority": "",
  "department": "",
  "reason": ""
}

Rules:

Category examples:
Electrical
Water
Road
Sanitation
Other

Priority:
Low
Medium
High

Department examples:
Electrical Department
Water Department
Road Department
Sanitation Department
General Department

Choose the most appropriate values.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanText);
}


module.exports = {
  analyzeReport,
};