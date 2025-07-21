import { ConvexError, v } from "convex/values"
import { internalMutation } from "../_generated/server";

export const insertTopName = internalMutation({
    args: {
        receivedId: v.id("moondream"),
        topName: v.string(),
        score: v.number(),
        photoUrl: v.string(),
        faceCheckUrlPhotoId: v.id("faceCheckUrls"),
    },
    handler: async (ctx, args) => {
        try {
            const { receivedId, topName, score, photoUrl, faceCheckUrlPhotoId } = args;

            await ctx.db.insert("topName", {
                receivedId,
                topName,
                score,
                photoUrl,
                faceCheckUrlPhotoId,
            });
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[insertTopName] Error: ${error}`,
            });
        }
    },
})