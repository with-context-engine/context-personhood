import { ConvexError, v } from "convex/values"
import { internalMutation } from "../_generated/server";

export const insertTopName = internalMutation({
    args: {
        receivedId: v.id("received"),
        topName: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const { receivedId, topName } = args;

            await ctx.db.insert("topName", {
                receivedId,
                topName,
            });
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[insertTopName] Error: ${error}`,
            });
        }
    },
})