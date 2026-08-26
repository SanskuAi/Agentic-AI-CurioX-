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


    // CHECK FILES

    if (!fs.existsSync(beforeImage)) {

        throw new Error(
            "Before image not found: " + beforeImage
        );

    }


    if (!fs.existsSync(afterImage)) {

        throw new Error(
            "After image not found: " + afterImage
        );

    }


    // READ IMAGES

    const beforeData =
        fs.readFileSync(beforeImage)
            .toString("base64");


    const afterData =
        fs.readFileSync(afterImage)
            .toString("base64");


    // MIME TYPE

    const beforeMime =
        getMimeType(beforeImage);


    const afterMime =
        getMimeType(afterImage);


    // PROMPT

    const prompt = `

You are an infrastructure resolution
verification agent.

Original problem:
${problem}

Compare the BEFORE image and AFTER image.

Determine whether the reported problem
appears to have been fixed.

Return ONLY valid JSON.

Use exactly one of these results:

{
    "result": "Likely Resolved",
    "reason": "short explanation"
}

OR

{
    "result": "Needs Reinspection",
    "reason": "short explanation"
}

Do not claim absolute certainty.

This is an AI evidence assessment.

`;


    // GEMINI

    const response =
        await ai.models.generateContent({

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

            ]

        });


    let text = response.text;


    console.log(
        "Gemini Response:",
        text
    );


    // REMOVE MARKDOWN

    text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();


    // FIND JSON

    const start =
        text.indexOf("{");

    const end =
        text.lastIndexOf("}");


    if (
        start === -1 ||
        end === -1
    ) {

        throw new Error(
            "Gemini did not return valid JSON"
        );

    }


    text =
        text.substring(
            start,
            end + 1
        );


    const result =
        JSON.parse(text);


    // VALIDATE RESULT

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


    return {

        result:
            result.result,

        reason:
            result.reason ||
            "AI assessment completed."

    };

}


// MIME TYPE FUNCTION

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


    return "image/jpeg";
}


module.exports = {
    verifyResolution
};