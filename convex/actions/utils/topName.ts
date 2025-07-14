"use node";

import { ConvexError } from "convex/values";
import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) {
    throw new ConvexError("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const identifyTopName = async (nameList: string[]) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
                You are a helpful assistant that identifies the most common real name from a list of possibly noisy names.
                Return a structured JSON with the extracted real name.
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
                    description: "Identify the most common real name from a list of names",
                    parameters: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "The most likely real name from the list",
                            },
                        },
                        required: ["name"],
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
    }
};

