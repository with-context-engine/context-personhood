import { ConvexError, v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertFaceCheckUrls = internalMutation({
    args: {
        id: v.id("received"),
        objects: v.array(v.object({
            url: v.string(),
            score: v.number(),
        })),
    },
    returns: v.object({
        id: v.id("received"),
    }),
    handler: async (ctx, args) => {
        try {
            const { id, objects } = args;

            for (const object of objects) {
                await ctx.db.insert("faceCheckUrls", {
                    receivedId: id,
                    url: object.url,
                    score: object.score,
                });
            }

            return {
                id,
            };
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[insertFaceCheckUrls] Error: ${error}`,
            });
        }
    }
})