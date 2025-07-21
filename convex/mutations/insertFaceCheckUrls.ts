import { ConvexError, v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertFaceCheckUrls = internalMutation({
    args: {
        id: v.id("moondream"),
        objects: v.array(v.object({
            url: v.string(),
            score: v.number(),
            base64: v.string(),
        })),
    },
    returns: v.object({
        id: v.id("moondream"),
    }),
    handler: async (ctx, args) => {
        try {
            const { id, objects } = args;

            for (const object of objects) {
                await ctx.db.insert("faceCheckUrls", {
                    receivedId: id,
                    url: object.url,
                    score: object.score,
                    base64: object.base64,
                });
            }

            console.log("[insertFaceCheckUrls] FaceCheckUrls inserted", {
                id,
                objects,
            });

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