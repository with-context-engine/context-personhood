"use node";

import { ConvexError } from "convex/values";
import { OpenAI } from "openai";
import { Id } from "../../_generated/dataModel";

if (!process.env.OPENAI_API_KEY) {
    throw new ConvexError("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const identifyTopName = async (nameList: { name: string, score: number, faceCheckUrlPhotoId: Id<"faceCheckUrls"> }[]) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
                You are a helpful assistant that identifies the most common real name from a list of possibly noisy names.
                Return a structured JSON with the extracted real name and its highest score from the list.
                `
            },
            {
                role: "user",
                content: JSON.stringify(nameList),
            },
        ],
        tools: [
            {
                type: "function",
                function: {
                    name: "identify_top_name",
                    description: "Identify the most common real name from a list of names and return the name with the highest score.",
                    parameters: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "The most likely real name from the list",
                            },
                            score: {
                                type: "number",
                                description: "The highest score associated with the most likely real name from the list",
                            },
                            faceCheckUrlPhotoId: {
                                type: "string",
                                description: "Do not manipulate or use this id in any way. It is used to retrieve the photo from the database.",
                            },
                        },
                        required: ["name", "score", "faceCheckUrlPhotoId"],
                    },
                }
            }
        ],
        tool_choice: {
            type: "function",
            function: {
                name: "identify_top_name",
            },
        },
    });

    const result = response.choices[0].message.tool_calls?.[0];
    if (!result) {
        throw new ConvexError(
            "[identifyTopName] No tool call found in the response",
        );
    }

    const args = JSON.parse(result.function.arguments);
    return {
        name: args.name,
        score: args.score,
        faceCheckUrlPhotoId: args.faceCheckUrlPhotoId,
    }
};

