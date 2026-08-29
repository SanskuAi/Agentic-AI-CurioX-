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