import { ConvexError, v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertExaWebContentExtraction = internalMutation({
    args: {
        receivedId: v.id("received"),
        exaExtraction: v.array(
            v.string(),
        ),
    },
    returns: v.object({
        receivedId: v.id("received"),
    }),
    handler: async (ctx, args) => {
        try {
            const { receivedId, exaExtraction } = args;

            for (const exaContent of exaExtraction) {
                await ctx.db.insert("exaWebExtraction", {
                    receivedId,
                    exaContentExtraction: exaContent,
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