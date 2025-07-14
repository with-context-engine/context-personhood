import { ConvexError, v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertExaWebContentExtraction = internalMutation({
    args: {
        receivedId: v.id("received"),
        results: v.array(
            v.object({
                name: v.string(),
                url: v.string(),
                score: v.number(),
            })
        ),
    },
    returns: v.object({
        receivedId: v.id("received"),
    }),
    handler: async (ctx, args) => {
        try {
            const { receivedId, results } = args;

            for (const result of results) {
                await ctx.db.insert("exaWebExtraction", {
                    receivedId,
                    exaContentExtraction: result.name,
                    url: result.url,
                    score: result.score,
                })
            }

            return {
                receivedId,
            }
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[insertExaWebContentExtraction] Error: ${error}`,
            });
        }
    }
})