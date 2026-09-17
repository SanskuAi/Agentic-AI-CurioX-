// require("dotenv").config();

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// async function analyzeReport(problem, location) {

//     if (!problem || !location) {
//         throw new Error("Problem and location are required");
//     }

//     console.log("Sending report to Gemini...");
//     console.log("Problem:", problem);
//     console.log("Location:", location);

//     const prompt = `
// You are an AI-powered public grievance analysis agent.

// Analyze the following citizen infrastructure complaint.

// Problem:
// ${problem}

// Location:
// ${location}

// Your job is to understand the complaint and provide an actionable analysis.

// Category must be exactly one of:
// Electrical
// Water
// Road
// Sanitation
// Other

// Severity must be exactly one of:
// Low
// Medium
// High

// Priority must be exactly one of:
// Low
// Medium
// High

// Department must be exactly one of:
// Electrical Department
// Water Department
// Road Department
// Sanitation Department
// General Department

// Generate:

// 1. category
// - Identify the main type of infrastructure problem.

// 2. severity
// - Estimate how serious the problem is based on its possible impact on citizens, safety, public infrastructure, or daily activities.

// 3. priority
// - Decide how urgently the department should handle the complaint.

// 4. department
// - Select the department responsible for resolving the issue.

// 5. summary
// - Give a short, clear summary of the complaint.

// 6. recommendation
// - Give a practical resolution action that the responsible department should take.

// 7. reason
// - Briefly explain why this category, severity, priority, and department were selected.

// Return only valid JSON.
// `;

//     try {

//         const response = await ai.models.generateContent({

//             model: "gemini-3.6-flash",

//             contents: prompt,

//             config: {

//                 responseMimeType: "application/json",

//                 responseSchema: {

//                     type: "object",

//                     properties: {

//                         category: {
//                             type: "string",
//                             enum: [
//                                 "Electrical",
//                                 "Water",
//                                 "Road",
//                                 "Sanitation",
//                                 "Other"
//                             ]
//                         },

//                         severity: {
//                             type: "string",
//                             enum: [
//                                 "Low",
//                                 "Medium",
//                                 "High"
//                             ]
//                         },

//                         priority: {
//                             type: "string",
//                             enum: [
//                                 "Low",
//                                 "Medium",
//                                 "High"
//                             ]
//                         },

//                         department: {
//                             type: "string",
//                             enum: [
//                                 "Electrical Department",
//                                 "Water Department",
//                                 "Road Department",
//                                 "Sanitation Department",
//                                 "General Department"
//                             ]
//                         },

//                         summary: {
//                             type: "string"
//                         },

//                         recommendation: {
//                             type: "string"
//                         },

//                         reason: {
//                             type: "string"
//                         }

//                     },

//                     required: [
//                         "category",
//                         "severity",
//                         "priority",
//                         "department",
//                         "summary",
//                         "recommendation",
//                         "reason"
//                     ]
//                 }
//             }
//         });

//         console.log("RAW GEMINI RESPONSE:");
//         console.log(response.text);

//         const result = JSON.parse(response.text);

//         console.log("AI ANALYSIS RESULT:");
//         console.log(result);

//         return result;

//     } catch (error) {

//         console.error("GEMINI ANALYSIS ERROR:");
//         console.error(error);

//         throw new Error(
//             "Gemini report analysis failed: " +
//             error.message
//         );
//     }
// }

// module.exports = {
//     analyzeReport
// };



// require("dotenv").config();

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// async function analyzeReport(problem, location) {

//     if (!problem || !location) {
//         throw new Error("Problem and location are required");
//     }

//     console.log("Sending report to Gemini...");
//     console.log("Problem:", problem);
//     console.log("Location:", location);

//     const prompt = `
// You are an infrastructure problem analysis agent.

// Analyze this infrastructure report.

// Problem:
// ${problem}

// Location:
// ${location}

// Choose the most appropriate values.

// Category must be exactly one of:
// Electrical
// Water
// Road
// Sanitation
// Other

// Priority must be exactly one of:
// Low
// Medium
// High

// Department must be exactly one of:
// Electrical Department
// Water Department
// Road Department
// Sanitation Department
// General Department

// Reason should be a short explanation of the classification.

// Return only valid JSON.
// `;

//     try {

//         const response = await ai.models.generateContent({
//             model: "gemini-3.6-flash",
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: {
//                     type: "object",
//                     properties: {
//                         category: {
//                             type: "string"
//                         },
//                         priority: {
//                             type: "string"
//                         },
//                         department: {
//                             type: "string"
//                         },
//                         reason: {
//                             type: "string"
//                         }
//                     },
//                     required: [
//                         "category",
//                         "priority",
//                         "department",
//                         "reason"
//                     ]
//                 }
//             }
//         });

//         console.log("RAW GEMINI RESPONSE:");
//         console.log(response.text);

//         const result = JSON.parse(response.text);

//         console.log("AI ANALYSIS RESULT:");
//         console.log(result);

//         return result;

//     } catch (error) {

//         console.error("GEMINI ANALYSIS ERROR:");
//         console.error(error);

//         throw new Error(
//             "Gemini report analysis failed: " +
//             error.message
//         );
//     }
// }

// module.exports = {
//     analyzeReport
// };


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
You are an AI-powered public grievance analysis agent.

Analyze the following citizen infrastructure complaint.

Problem:
${problem}

Location:
${location}

Your job is to understand the complaint and provide an actionable analysis.

Category must be exactly one of:
Electrical
Water
Road
Sanitation
Other

Severity must be exactly one of:
Low
Medium
High

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

Generate:

1. category
- Identify the main type of infrastructure problem.

2. severity
- Estimate how serious the problem is based on its possible impact on citizens, safety, public infrastructure, or daily activities.

3. priority
- Decide how urgently the department should handle the complaint.

4. department
- Select the department responsible for resolving the issue.

5. summary
- Give a short, clear summary of the complaint.

6. recommendation
- Give a practical resolution action that the responsible department should take.

7. reason
- Briefly explain why this category, severity, priority, and department were selected.

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
                            type: "string",
                            enum: [
                                "Electrical",
                                "Water",
                                "Road",
                                "Sanitation",
                                "Other"
                            ]
                        },

                        severity: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ]
                        },

                        priority: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ]
                        },

                        department: {
                            type: "string",
                            enum: [
                                "Electrical Department",
                                "Water Department",
                                "Road Department",
                                "Sanitation Department",
                                "General Department"
                            ]
                        },

                        summary: {
                            type: "string"
                        },

                        recommendation: {
                            type: "string"
                        },

                        reason: {
                            type: "string"
                        }

                    },

                    required: [
                        "category",
                        "severity",
                        "priority",
                        "department",
                        "summary",
                        "recommendation",
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