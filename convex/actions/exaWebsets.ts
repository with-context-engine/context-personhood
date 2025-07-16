"use node";

import { ConvexError, v } from "convex/values";
import { Exa } from "exa-js";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { extractHumanNamesFromExaResults, normalizeUrl } from "./utils/extract";

if (!process.env.EXA_API_KEY) {
    throw new Error("EXA_API_KEY is not set");
}

export const exaWebsetsExtraction = internalAction({
    args: {
        receivedId: v.id("moondream"),
        objects: v.array(
            v.object({
                url: v.string(),
                score: v.number(),
            })
        )
    },
    handler: async (ctx, args) => {
        try {
            // Keep both url and score for mapping
            const filteredObjects = args.objects.filter(obj => obj.score > 50);
            const _websetUrls = filteredObjects.map(obj => obj.url);
            const urlToScore = Object.fromEntries(filteredObjects.map(obj => [normalizeUrl(obj.url), obj.score]));

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


            console.log("[exaWebsetsExtraction] _results", _results);
            console.log("[exaWebsetsExtraction] urlToScore", urlToScore);

            const extracted = extractHumanNamesFromExaResults(_results, urlToScore);

            await ctx.runMutation(internal.mutations.insertExaSet.insertExaWebContentExtraction, {
                receivedId: args.receivedId,
                results: extracted,
            });

        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[exaWebsetsExtraction] Error: ${error}`,
            });
        }
    }
})