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



// *******4TH STAGE
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


require("dotenv").config();
console.log("GEMINI MODEL:", process.env.GEMINI_MODEL);

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ==================== WAIT FUNCTION ====================

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ==================== AI REPORT ANALYSIS ====================

async function analyzeReport(problem, location) {

    if (!problem || !location) {
        throw new Error("Problem and location are required");
    }

    console.log("=================================");
    console.log("AI REPORT ANALYSIS");
    console.log("=================================");
    console.log("Problem:", problem);
    console.log("Location:", location);


    // ==================== PROMPT ====================

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


    // ==================== RETRY SETTINGS ====================

    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            console.log(
                `Sending report to Gemini... Attempt ${attempt}/${maxAttempts}`
            );


            // ====================
            // GEMINI REQUEST
            // ====================

            const response =
                await ai.models.generateContent({

                    model: "gemini-3.6-flash",

                    // model: process.env.GEMINI_MODEL,

                    contents: prompt,

                    config: {

                        responseMimeType:
                            "application/json",

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


            // ====================
            // GEMINI RESPONSE
            // ====================

            console.log("RAW GEMINI RESPONSE:");

            console.log(response.text);


            // ====================
            // PARSE JSON
            // ====================

            const result =
                JSON.parse(response.text);


            // ====================
            // SUCCESS
            // ====================

            console.log("AI ANALYSIS RESULT:");

            console.log(result);

            console.log(
                "Gemini analysis successful."
            );


            return result;


        } catch (error) {

            console.error(
                `Gemini attempt ${attempt} failed.`
            );

            console.error(
                error.message
            );


            // ====================
            // CHECK TEMPORARY ERROR
            // ====================

            const errorMessage =
                error.message || "";

            const status =
                error.status;


            const isTemporaryError =
                status === 503 ||
                status === 429 ||
                errorMessage.includes("503") ||
                errorMessage.includes("429") ||
                errorMessage.includes("UNAVAILABLE") ||
                errorMessage.includes("high demand") ||
                errorMessage.includes("fetch failed") ||
                errorMessage.includes("ECONNRESET");


            // ====================
            // RETRY
            // ====================

            if (
                isTemporaryError &&
                attempt < maxAttempts
            ) {

                const delay =
                    attempt * 3000;

                console.log(
                    `Temporary Gemini error. Retrying in ${delay / 1000} seconds...`
                );

                await wait(delay);

                continue;

            }


            // ====================
            // FINAL ERROR
            // ====================

            console.error(
                "GEMINI ANALYSIS ERROR:"
            );

            console.error(error);


            throw new Error(
                "Gemini report analysis failed: " +
                error.message
            );

        }

    }

}


module.exports = {
    analyzeReport
};






// require("dotenv").config();

// console.log("GEMINI MODEL:", process.env.GEMINI_MODEL);

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });


// // ==================== WAIT FUNCTION ====================

// function wait(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }


// // ==================== AI REPORT ANALYSIS ====================

// async function analyzeReport(problem, location) {

//     if (!problem || !location) {
//         throw new Error("Problem and location are required");
//     }

//     console.log("\n=================================");
//     console.log("      AI REPORT ANALYSIS AGENT");
//     console.log("=================================");

//     console.log("Problem :", problem);
//     console.log("Location:", location);


//     // ==================== AGENT PROMPT ====================

//     const prompt = `

// You are an AI-powered Public Infrastructure Grievance Analysis Agent.

// Your responsibility is to transform a citizen's raw complaint
// into a structured and actionable infrastructure management decision.

// You are NOT just classifying text.

// You must reason about:

// 1. What the actual infrastructure problem is.
// 2. What type of infrastructure is affected.
// 3. How serious the problem could be.
// 4. How urgently it should be handled.
// 5. Which department should receive it.
// 6. What practical action should be taken.
// 7. Why the decision was made.

// ----------------------------------------
// CITIZEN COMPLAINT
// ----------------------------------------

// Problem:
// ${problem}

// Location:
// ${location}

// ----------------------------------------
// STEP 1 — UNDERSTAND THE PROBLEM
// ----------------------------------------

// Identify the actual issue described by the citizen.

// Focus on the infrastructure problem itself,
// not unnecessary details.

// ----------------------------------------
// STEP 2 — CATEGORY
// ----------------------------------------

// Choose exactly ONE category:

// Electrical
// Water
// Road
// Sanitation
// Other

// Examples:

// Broken streetlight → Electrical
// Water leakage → Water
// Pothole / damaged road → Road
// Garbage / drainage / waste → Sanitation
// Anything outside these categories → Other

// ----------------------------------------
// STEP 3 — SEVERITY
// ----------------------------------------

// Severity represents the potential seriousness or impact
// of the infrastructure problem.

// Choose exactly ONE:

// Low
// Medium
// High

// Consider:

// - Safety risk
// - Public impact
// - Infrastructure damage
// - Effect on daily activities
// - Possibility of worsening

// Do not automatically assign High severity.

// ----------------------------------------
// STEP 4 — PRIORITY
// ----------------------------------------

// Priority represents how urgently the responsible department
// should respond.

// Choose exactly ONE:

// Low
// Medium
// High

// Priority may depend on:

// - Immediate safety concerns
// - Number of people potentially affected
// - Public accessibility
// - Essential services
// - Risk of further damage
// - Urgency of repair

// IMPORTANT:

// Severity and Priority are different.

// Severity = How serious is the problem?

// Priority = How urgently should it be handled?

// ----------------------------------------
// STEP 5 — DEPARTMENT
// ----------------------------------------

// Choose exactly ONE responsible department:

// Electrical Department
// Water Department
// Road Department
// Sanitation Department
// General Department

// The selected department must match the category
// and actual infrastructure issue.

// ----------------------------------------
// STEP 6 — SUMMARY
// ----------------------------------------

// Create a short, clear summary that an administrator
// or department officer can understand quickly.

// ----------------------------------------
// STEP 7 — RECOMMENDATION
// ----------------------------------------

// Provide a practical next action for the responsible department.

// The recommendation should be related to the reported issue.

// Examples:

// - Inspect and repair damaged electrical wiring.
// - Repair the leaking water pipeline.
// - Inspect and repair the damaged road surface.
// - Clear accumulated waste and inspect the drainage system.

// Do not provide unrealistic or unnecessary actions.

// ----------------------------------------
// STEP 8 — REASON
// ----------------------------------------

// Briefly explain the overall decision.

// The reason should connect:

// Problem
// +
// Severity
// +
// Priority
// +
// Department

// Keep it concise.

// ----------------------------------------
// DECISION RULES
// ----------------------------------------

// Follow these rules:

// 1. Use only the allowed categories.
// 2. Use only the allowed severity values.
// 3. Use only the allowed priority values.
// 4. Use only the allowed department names.
// 5. Do not invent information that was not provided.
// 6. Do not assume an emergency without evidence.
// 7. Keep the analysis practical and explainable.
// 8. The department must logically match the problem.
// 9. Severity and priority must be independently considered.
// 10. Return ONLY valid JSON.

// ----------------------------------------
// EXPECTED OUTPUT
// ----------------------------------------

// {
//     "category": "...",
//     "severity": "...",
//     "priority": "...",
//     "department": "...",
//     "summary": "...",
//     "recommendation": "...",
//     "reason": "..."
// }

// `;


//     // ==================== RETRY SETTINGS ====================

//     const maxAttempts = 3;


//     for (
//         let attempt = 1;
//         attempt <= maxAttempts;
//         attempt++
//     ) {

//         try {

//             console.log(
//                 `\nAI AGENT EXECUTION - Attempt ${attempt}/${maxAttempts}`
//             );


//             // ==================== GEMINI REQUEST ====================

//             const response =
//                 await ai.models.generateContent({

//                     model: "gemini-3.6-flash",

//                     contents: prompt,

//                     config: {

//                         responseMimeType:
//                             "application/json",

//                         responseSchema: {

//                             type: "object",

//                             properties: {

//                                 category: {
//                                     type: "string",
//                                     enum: [
//                                         "Electrical",
//                                         "Water",
//                                         "Road",
//                                         "Sanitation",
//                                         "Other"
//                                     ]
//                                 },

//                                 severity: {
//                                     type: "string",
//                                     enum: [
//                                         "Low",
//                                         "Medium",
//                                         "High"
//                                     ]
//                                 },

//                                 priority: {
//                                     type: "string",
//                                     enum: [
//                                         "Low",
//                                         "Medium",
//                                         "High"
//                                     ]
//                                 },

//                                 department: {
//                                     type: "string",
//                                     enum: [
//                                         "Electrical Department",
//                                         "Water Department",
//                                         "Road Department",
//                                         "Sanitation Department",
//                                         "General Department"
//                                     ]
//                                 },

//                                 summary: {
//                                     type: "string"
//                                 },

//                                 recommendation: {
//                                     type: "string"
//                                 },

//                                 reason: {
//                                     type: "string"
//                                 }

//                             },

//                             required: [
//                                 "category",
//                                 "severity",
//                                 "priority",
//                                 "department",
//                                 "summary",
//                                 "recommendation",
//                                 "reason"
//                             ]
//                         }
//                     }
//                 });


//             // ==================== RAW RESPONSE ====================

//             console.log("\nRAW GEMINI RESPONSE:");
//             console.log(response.text);


//             // ==================== PARSE JSON ====================

//             let result;

//             try {

//                 result = JSON.parse(response.text);

//             } catch (parseError) {

//                 throw new Error(
//                     "Invalid JSON response from Gemini"
//                 );
//             }


//             // ==================== VALIDATE AI DECISION ====================

//             const validCategories = [
//                 "Electrical",
//                 "Water",
//                 "Road",
//                 "Sanitation",
//                 "Other"
//             ];

//             const validLevels = [
//                 "Low",
//                 "Medium",
//                 "High"
//             ];

//             const validDepartments = [
//                 "Electrical Department",
//                 "Water Department",
//                 "Road Department",
//                 "Sanitation Department",
//                 "General Department"
//             ];


//             if (
//                 !validCategories.includes(
//                     result.category
//                 )
//             ) {
//                 throw new Error(
//                     "Invalid AI category"
//                 );
//             }


//             if (
//                 !validLevels.includes(
//                     result.severity
//                 )
//             ) {
//                 throw new Error(
//                     "Invalid AI severity"
//                 );
//             }


//             if (
//                 !validLevels.includes(
//                     result.priority
//                 )
//             ) {
//                 throw new Error(
//                     "Invalid AI priority"
//                 );
//             }


//             if (
//                 !validDepartments.includes(
//                     result.department
//                 )
//             ) {
//                 throw new Error(
//                     "Invalid AI department"
//                 );
//             }


//             // ==================== SUCCESS ====================

//             console.log("\n=================================");
//             console.log("       AI DECISION COMPLETED");
//             console.log("=================================");

//             console.log(
//                 "Category       :", result.category
//             );

//             console.log(
//                 "Severity       :", result.severity
//             );

//             console.log(
//                 "Priority       :", result.priority
//             );

//             console.log(
//                 "Department     :", result.department
//             );

//             console.log(
//                 "Summary        :", result.summary
//             );

//             console.log(
//                 "Recommendation :", result.recommendation
//             );

//             console.log(
//                 "Reason         :", result.reason
//             );

//             console.log("=================================\n");


//             // IMPORTANT:
//             // Existing return structure is preserved.

//             return result;


//         } catch (error) {

//             console.error(
//                 `Gemini attempt ${attempt} failed.`
//             );

//             console.error(
//                 error.message
//             );


//             // ==================== TEMPORARY ERROR ====================

//             const errorMessage =
//                 error.message || "";

//             const status =
//                 error.status;


//             const isTemporaryError =
//                 status === 503 ||
//                 status === 429 ||
//                 errorMessage.includes("503") ||
//                 errorMessage.includes("429") ||
//                 errorMessage.includes("UNAVAILABLE") ||
//                 errorMessage.includes("high demand") ||
//                 errorMessage.includes("fetch failed") ||
//                 errorMessage.includes("ECONNRESET");


//             // ==================== RETRY ====================

//             if (
//                 isTemporaryError &&
//                 attempt < maxAttempts
//             ) {

//                 const delay =
//                     attempt * 3000;

//                 console.log(
//                     `Temporary Gemini error. Retrying in ${delay / 1000} seconds...`
//                 );

//                 await wait(delay);

//                 continue;
//             }


//             // ==================== FINAL ERROR ====================

//             console.error(
//                 "\n================================="
//             );

//             console.error(
//                 "    GEMINI ANALYSIS FAILED"
//             );

//             console.error(
//                 "================================="
//             );

//             console.error(error);


//             throw new Error(
//                 "Gemini report analysis failed: " +
//                 error.message
//             );
//         }
//     }
// }


// module.exports = {
//     analyzeReport
// };

