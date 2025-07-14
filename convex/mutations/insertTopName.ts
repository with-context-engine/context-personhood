import { ConvexError, v } from "convex/values"
import { internalMutation } from "../_generated/server";

export const insertTopName = internalMutation({
    args: {
        receivedId: v.id("received"),
        topName: v.string(),
        score: v.number(),
    },
    handler: async (ctx, args) => {
        try {
            const { receivedId, topName, score } = args;

            await ctx.db.insert("topName", {
                receivedId,
                topName,
                score,
            });
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[insertTopName] Error: ${error}`,
            });
        }
    },
})