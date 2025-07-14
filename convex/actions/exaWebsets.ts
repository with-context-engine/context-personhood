"use node";

import { ConvexError, v } from "convex/values";
import { Exa } from "exa-js";
import { internalAction } from "../_generated/server";
import { extractHumanNamesFromExaResults } from "./utils/extract";

if (!process.env.EXA_API_KEY) {
    throw new Error("EXA_API_KEY is not set");
}

export const exaWebsetsExtraction = internalAction({
    args: {
        objects: v.array(
            v.object({
                url: v.string(),
                score: v.number(),
            })
        )
    },
    returns: v.array(v.string()),
    handler: async (ctx, args) => {
        try {
            const _websetUrls: string[] = [];
            for (const object of args.objects) {
                if (object.score > 50) {
                    _websetUrls.push(object.url);
                }
            }

            if (_websetUrls.length === 0) {
                return [];
            }

            const exa = new Exa(process.env.EXA_API_KEY);
            
            const _results = await exa.getContents(
                _websetUrls,
                {
                    text: true,
                    summary: {
                      query: "Return the human names from this webpage. Do not return any other names if they are not human names. ",
                      schema: {
                        description: "Schema for a list of human names",
                        type: "object",
                        required: ["names"],
                        additionalProperties: false,
                        properties: {
                          names: {
                            type: "array",
                            description: "List of human names extracted from the webpage",
                            items: {
                              type: "string",
                              description: "A human name"
                            }
                          }
                        }
                      }
                    }
                  }
                )

            return extractHumanNamesFromExaResults(_results);

        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[exaWebsetsExtraction] Error: ${error}`,
            });
        }
    }
})