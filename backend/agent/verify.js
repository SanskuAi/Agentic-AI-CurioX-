// const fs = require("fs");
// const path = require("path");

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });


// async function verifyResolution(
//     beforeImage,
//     afterImage,
//     problem
// ) {

//     console.log("BEFORE IMAGE:", beforeImage);
//     console.log("AFTER IMAGE:", afterImage);


//     // CHECK FILES

//     if (!fs.existsSync(beforeImage)) {

//         throw new Error(
//             "Before image not found: " + beforeImage
//         );

//     }


//     if (!fs.existsSync(afterImage)) {

//         throw new Error(
//             "After image not found: " + afterImage
//         );

//     }


//     // READ IMAGES

//     const beforeData =
//         fs.readFileSync(beforeImage)
//             .toString("base64");


//     const afterData =
//         fs.readFileSync(afterImage)
//             .toString("base64");


//     // MIME TYPE

//     const beforeMime =
//         getMimeType(beforeImage);


//     const afterMime =
//         getMimeType(afterImage);


//     // PROMPT

//     const prompt = `

// You are an infrastructure resolution
// verification agent.

// Original problem:
// ${problem}

// Compare the BEFORE image and AFTER image.

// Determine whether the reported problem
// appears to have been fixed.

// Return ONLY valid JSON.

// Use exactly one of these results:

// {
//     "result": "Likely Resolved",
//     "reason": "short explanation"
// }

// OR

// {
//     "result": "Needs Reinspection",
//     "reason": "short explanation"
// }

// Do not claim absolute certainty.

// This is an AI evidence assessment.

// `;


//     // GEMINI

//     const response =
//         await ai.models.generateContent({

//             model: "gemini-3.6-flash",

//             contents: [

//                 {
//                     text: prompt
//                 },

//                 {
//                     inlineData: {
//                         mimeType: beforeMime,
//                         data: beforeData
//                     }
//                 },

//                 {
//                     inlineData: {
//                         mimeType: afterMime,
//                         data: afterData
//                     }
//                 }

//             ]

//         });


//     let text = response.text;


//     console.log(
//         "Gemini Response:",
//         text
//     );


//     // REMOVE MARKDOWN

//     text = text
//         .replace(/```json/gi, "")
//         .replace(/```/g, "")
//         .trim();


//     // FIND JSON

//     const start =
//         text.indexOf("{");

//     const end =
//         text.lastIndexOf("}");


//     if (
//         start === -1 ||
//         end === -1
//     ) {

//         throw new Error(
//             "Gemini did not return valid JSON"
//         );

//     }


//     text =
//         text.substring(
//             start,
//             end + 1
//         );


//     const result =
//         JSON.parse(text);


//     // VALIDATE RESULT

//     if (
//         result.result !==
//             "Likely Resolved" &&

//         result.result !==
//             "Needs Reinspection"
//     ) {

//         throw new Error(
//             "Invalid AI verification result"
//         );

//     }


//     return {

//         result:
//             result.result,

//         reason:
//             result.reason ||
//             "AI assessment completed."

//     };

// }


// // MIME TYPE FUNCTION

// function getMimeType(filePath) {

//     const extension =
//         path.extname(filePath)
//             .toLowerCase();


//     if (extension === ".png") {
//         return "image/png";
//     }

//     if (
//         extension === ".jpg" ||
//         extension === ".jpeg"
//     ) {
//         return "image/jpeg";
//     }

//     if (extension === ".webp") {
//         return "image/webp";
//     }


//     return "image/jpeg";
// }


// module.exports = {
//     verifyResolution
// };

require("dotenv").config();
console.log("GEMINI MODEL:", process.env.GEMINI_MODEL);

const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function verifyResolution(
    beforeImage,
    afterImage,
    problem
) {

    console.log("BEFORE IMAGE:", beforeImage);
    console.log("AFTER IMAGE:", afterImage);

    // ==================== CHECK BEFORE IMAGE ====================

    if (!beforeImage || !fs.existsSync(beforeImage)) {
        throw new Error(
            "Before image not found: " + beforeImage
        );
    }

    // ==================== CHECK AFTER IMAGE ====================

    if (!afterImage || !fs.existsSync(afterImage)) {
        throw new Error(
            "After image not found: " + afterImage
        );
    }

    // ==================== READ IMAGES ====================

    const beforeData = fs
        .readFileSync(beforeImage)
        .toString("base64");

    const afterData = fs
        .readFileSync(afterImage)
        .toString("base64");

    // ==================== MIME TYPES ====================

    const beforeMime = getMimeType(beforeImage);
    const afterMime = getMimeType(afterImage);

    // ==================== PROMPT ====================

    const prompt = `
You are an infrastructure resolution verification agent.

Original reported problem:
${problem}

You are given two images.

BEFORE image:
Shows the original reported infrastructure problem.

AFTER image:
Shows the condition after the department claims the problem was fixed.

Compare the BEFORE and AFTER images.

Determine whether the original problem appears to have been fixed.

Return only one of these results:

Likely Resolved

OR

Needs Reinspection

Do not claim absolute certainty.
This is an AI evidence assessment.

Give a short reason for your decision.
`;

    // ==================== GEMINI REQUEST ====================

    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            console.log(
                `Sending verification to Gemini... Attempt ${attempt}/3`
            );

            const response =
                await ai.models.generateContent({

                    // Use the same model that is working
                    model: "gemini-3.6-flash",

                    // model: process.env.GEMINI_MODEL,

                    contents: [
                        {
                            text: prompt
                        },
                        {
                            inlineData: {
                                mimeType: beforeMime,
                                data: beforeData
                            }
                        },
                        {
                            inlineData: {
                                mimeType: afterMime,
                                data: afterData
                            }
                        }
                    ],

                    config: {
                        responseMimeType:
                            "application/json",

                        responseSchema: {
                            type: "object",

                            properties: {

                                result: {
                                    type: "string"
                                },

                                reason: {
                                    type: "string"
                                }

                            },

                            required: [
                                "result",
                                "reason"
                            ]
                        }
                    }

                });

            console.log(
                "RAW VERIFICATION RESPONSE:"
            );

            console.log(response.text);

            const result =
                JSON.parse(response.text);

            // ==================== VALIDATE RESULT ====================

            if (
                result.result !==
                    "Likely Resolved" &&
                result.result !==
                    "Needs Reinspection"
            ) {

                throw new Error(
                    "Invalid AI verification result"
                );
            }

            console.log(
                "VERIFICATION RESULT:",
                result
            );

            return {
                result: result.result,

                reason:
                    result.reason ||
                    "AI assessment completed."
            };

        } catch (error) {

            lastError = error;

            console.error(
                `Gemini verification attempt ${attempt} failed:`
            );

            console.error(error.message);

            // Retry only for temporary Gemini errors

            if (
                error.status === 503 ||
                error.status === 429 ||
                error.message.includes("fetch failed")
            ) {

                if (attempt < 3) {

                    console.log(
                        "Temporary Gemini error. Retrying..."
                    );

                    await new Promise(
                        resolve =>
                            setTimeout(resolve, 3000)
                    );

                    continue;
                }
            }

            break;
        }
    }

    // ==================== FINAL ERROR ====================

    console.error(
        "GEMINI VERIFICATION ERROR:"
    );

    console.error(lastError);

    throw new Error(
        "Gemini verification failed: " +
        lastError.message
    );
}


// ==================== MIME TYPE ====================

function getMimeType(filePath) {

    const extension =
        path.extname(filePath)
            .toLowerCase();

    if (extension === ".png") {
        return "image/png";
    }

    if (
        extension === ".jpg" ||
        extension === ".jpeg"
    ) {
        return "image/jpeg";
    }

    if (extension === ".webp") {
        return "image/webp";
    }

    throw new Error(
        "Unsupported image type: " +
        extension
    );
}


module.exports = {
    verifyResolution
};

// javascript
// require("dotenv").config();

// console.log("GEMINI MODEL:", process.env.GEMINI_MODEL);

// const fs = require("fs");
// const path = require("path");
// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// async function verifyResolution(
//     beforeImage,
//     afterImage,
//     problem
// ) {
//     console.log("\n========================================");
//     console.log("   AI INFRASTRUCTURE VERIFICATION");
//     console.log("========================================");

//     console.log("BEFORE IMAGE:", beforeImage);
//     console.log("AFTER IMAGE :", afterImage);
//     console.log("PROBLEM     :", problem);

//     // ==================== CHECK BEFORE IMAGE ====================

//     if (!beforeImage || !fs.existsSync(beforeImage)) {
//         throw new Error(
//             "Before image not found: " + beforeImage
//         );
//     }

//     // ==================== CHECK AFTER IMAGE ====================

//     if (!afterImage || !fs.existsSync(afterImage)) {
//         throw new Error(
//             "After image not found: " + afterImage
//         );
//     }

//     console.log("✓ Both images found");

//     // ==================== READ IMAGES ====================

//     const beforeData = fs
//         .readFileSync(beforeImage)
//         .toString("base64");

//     const afterData = fs
//         .readFileSync(afterImage)
//         .toString("base64");

//     console.log("✓ Images converted to Base64");

//     // ==================== MIME TYPES ====================

//     const beforeMime = getMimeType(beforeImage);
//     const afterMime = getMimeType(afterImage);

//     console.log("BEFORE MIME:", beforeMime);
//     console.log("AFTER MIME :", afterMime);

//     // ==================== PROMPT ====================

//     const prompt = `
// You are an AI-powered Infrastructure Resolution Verification Agent.

// Your task is to compare a BEFORE image and an AFTER image
// and determine whether a reported infrastructure problem
// appears to have been resolved.

// ORIGINAL REPORTED PROBLEM:
// ${problem}

// ----------------------------------------
// ANALYSIS INSTRUCTIONS
// ----------------------------------------

// Analyze the images as visual evidence.

// 1. Identify the infrastructure issue described in the report.

// 2. Examine the BEFORE image:
//    - What visible condition represents the reported problem?
//    - Identify important visual evidence.

// 3. Examine the AFTER image:
//    - Check whether the same problem is still visible.
//    - Look for visible repair, replacement, cleaning,
//      restoration, removal, or improvement.
//    - Check whether the AFTER image actually provides
//      sufficient evidence of resolution.

// 4. Compare BEFORE vs AFTER.

// 5. Be conservative:
//    - If there is clear visual improvement matching the
//      reported problem, classify it as "Likely Resolved".
//    - If the problem remains visible, the images are unclear,
//      unrelated, insufficient, or the claimed repair cannot
//      be visually verified, classify it as "Needs Reinspection".

// 6. Do not assume that a problem was fixed merely because
//    the AFTER image looks different.

// 7. Do not claim absolute certainty.
//    This is an AI-based visual evidence assessment.

// ----------------------------------------
// IMPORTANT
// ----------------------------------------

// The decision must be based primarily on visible evidence
// in the two images and the original problem description.

// Return only JSON matching the requested schema.

// The result MUST be exactly one of:

// "Likely Resolved"

// OR

// "Needs Reinspection"

// The reason should be short, specific, and explain what
// changed between the BEFORE and AFTER images.

// Example reasoning style:

// "The reported pothole is visible in the BEFORE image,
// while the corresponding road area appears repaired in
// the AFTER image."

// Do not provide extra fields.
// `;

//     // ==================== GEMINI REQUEST ====================

//     let lastError;

//     for (let attempt = 1; attempt <= 3; attempt++) {

//         try {

//             console.log("\n----------------------------------------");
//             console.log(
//                 `AI ANALYSIS ATTEMPT ${attempt}/3`
//             );
//             console.log("----------------------------------------");

//             const response =
//                 await ai.models.generateContent({

//                     // Keep the working model
//                     model: "gemini-3.6-flash",

//                     contents: [
//                         {
//                             text: prompt
//                         },

//                         // BEFORE IMAGE
//                         {
//                             inlineData: {
//                                 mimeType: beforeMime,
//                                 data: beforeData
//                             }
//                         },

//                         // AFTER IMAGE
//                         {
//                             inlineData: {
//                                 mimeType: afterMime,
//                                 data: afterData
//                             }
//                         }
//                     ],

//                     config: {
//                         responseMimeType:
//                             "application/json",

//                         responseSchema: {
//                             type: "object",

//                             properties: {

//                                 result: {
//                                     type: "string",
//                                     enum: [
//                                         "Likely Resolved",
//                                         "Needs Reinspection"
//                                     ]
//                                 },

//                                 reason: {
//                                     type: "string"
//                                 }
//                             },

//                             required: [
//                                 "result",
//                                 "reason"
//                             ]
//                         }
//                     }
//                 });

//             // ==================== RAW RESPONSE ====================

//             console.log("\nRAW AI VERIFICATION RESPONSE:");
//             console.log(response.text);

//             // ==================== PARSE RESPONSE ====================

//             let result;

//             try {

//                 result = JSON.parse(response.text);

//             } catch (parseError) {

//                 console.error(
//                     "AI returned invalid JSON."
//                 );

//                 throw new Error(
//                     "Invalid JSON response from Gemini"
//                 );
//             }

//             // ==================== VALIDATE RESULT ====================

//             if (
//                 result.result !==
//                     "Likely Resolved" &&

//                 result.result !==
//                     "Needs Reinspection"
//             ) {
//                 throw new Error(
//                     "Invalid AI verification result"
//                 );
//             }

//             // ==================== CLEAN REASON ====================

//             const reason =
//                 result.reason &&
//                 result.reason.trim()
//                     ? result.reason.trim()
//                     : "AI assessment completed.";

//             // ==================== FINAL RESULT LOG ====================

//             console.log("\n========================================");
//             console.log("       VERIFICATION COMPLETED");
//             console.log("========================================");

//             console.log(
//                 "RESULT:",
//                 result.result
//             );

//             console.log(
//                 "REASON:",
//                 reason
//             );

//             console.log("========================================\n");

//             // IMPORTANT:
//             // Keep the same return structure
//             // so your existing backend does not break.

//             return {
//                 result: result.result,
//                 reason: reason
//             };

//         } catch (error) {

//             lastError = error;

//             console.error(
//                 `Gemini verification attempt ${attempt} failed:`
//             );

//             console.error(error.message);

//             // ==================== RETRY LOGIC ====================

//             if (
//                 error.status === 503 ||
//                 error.status === 429 ||
//                 error.message.includes("fetch failed")
//             ) {

//                 if (attempt < 3) {

//                     console.log(
//                         "Temporary Gemini error."
//                     );

//                     console.log(
//                         "Retrying in 3 seconds..."
//                     );

//                     await new Promise(
//                         resolve =>
//                             setTimeout(resolve, 3000)
//                     );

//                     continue;
//                 }
//             }

//             break;
//         }
//     }

//     // ==================== FINAL ERROR ====================

//     console.error(
//         "\n========================================"
//     );

//     console.error(
//         "      GEMINI VERIFICATION FAILED"
//     );

//     console.error(
//         "========================================"
//     );

//     console.error(lastError);

//     throw new Error(
//         "Gemini verification failed: " +
//         lastError.message
//     );
// }


// // ==================== MIME TYPE ====================

// function getMimeType(filePath) {

//     const extension =
//         path.extname(filePath)
//             .toLowerCase();

//     if (extension === ".png") {
//         return "image/png";
//     }

//     if (
//         extension === ".jpg" ||
//         extension === ".jpeg"
//     ) {
//         return "image/jpeg";
//     }

//     if (extension === ".webp") {
//         return "image/webp";
//     }

//     throw new Error(
//         "Unsupported image type: " +
//         extension
//     );
// }


// // ==================== EXPORT ====================

// module.exports = {
//     verifyResolution
// };

