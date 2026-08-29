// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });


// // AI ANALYSIS

// async function analyzeReport(problem, location) {

//   const prompt = `
// You are an infrastructure problem analysis agent.

// Analyze this report:

// Problem:
// ${problem}

// Location:
// ${location}

// Return ONLY valid JSON:

// {
//   "category": "",
//   "priority": "",
//   "department": "",
//   "reason": ""
// }

// Rules:

// Category examples:
// Electrical
// Water
// Road
// Sanitation
// Other

// Priority:
// Low
// Medium
// High

// Department examples:
// Electrical Department
// Water Department
// Road Department
// Sanitation Department
// General Department

// Choose the most appropriate values.
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-3.6-flash",
//     contents: prompt,
//   });

//   const text = response.text.trim();

//   const cleanText = text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();

//   return JSON.parse(cleanText);
// }


// module.exports = {
//   analyzeReport,
// };

// javascript
// ```javascript
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeReport(problem, location) {

    if (!problem || !location) {
        throw new Error("Problem and location are required");
    }

    console.log("Sending report to Gemini...");
    console.log("Problem:", problem);
    console.log("Location:", location);

    const prompt = `
You are an infrastructure problem analysis agent.

Analyze this infrastructure report.

Problem:
${problem}

Location:
${location}

Choose the most appropriate values.

Category must be exactly one of:
Electrical
Water
Road
Sanitation
Other

Priority must be exactly one of:
Low
Medium
High

Department must be exactly one of:
Electrical Department
Water Department
Road Department
Sanitation Department
General Department

Reason should be a short explanation of the classification.

Return only valid JSON.
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        category: {
                            type: "string"
                        },
                        priority: {
                            type: "string"
                        },
                        department: {
                            type: "string"
                        },
                        reason: {
                            type: "string"
                        }
                    },
                    required: [
                        "category",
                        "priority",
                        "department",
                        "reason"
                    ]
                }
            }
        });

        console.log("RAW GEMINI RESPONSE:");
        console.log(response.text);

        const result = JSON.parse(response.text);

        console.log("AI ANALYSIS RESULT:");
        console.log(result);

        return result;

    } catch (error) {

        console.error("GEMINI ANALYSIS ERROR:");
        console.error(error);

        throw new Error(
            "Gemini report analysis failed: " +
            error.message
        );
    }
}

module.exports = {
    analyzeReport
};

