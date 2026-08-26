const fs = require("fs");

const { GoogleGenAI } =
    require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


async function verifyResolution(
    beforeImage,
    afterImage,
    problem
) {

    const beforeData =
        fs.readFileSync(beforeImage)
            .toString("base64");

    const afterData =
        fs.readFileSync(afterImage)
            .toString("base64");


    const prompt = `
You are an infrastructure resolution
verification agent.

Original problem:
${problem}

Compare the BEFORE image and AFTER image.

Determine whether the reported problem
appears to have been fixed.

Return ONLY JSON:

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


    const response =
        await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: [

                {
                    text: prompt,
                },

                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: beforeData,
                    },
                },

                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: afterData,
                    },
                },

            ],

        });


    const text =
        response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


    return JSON.parse(text);

}


module.exports = {
    verifyResolution
};