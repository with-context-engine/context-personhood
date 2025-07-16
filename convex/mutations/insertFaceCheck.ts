import { ConvexError, v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const faceCheckId = internalMutation({
    args: {
        id: v.id("moondream"),
        faceCheckId: v.string(),
    },
    returns: v.object({
        faceCheckId: v.string(),
    }),
    handler: async (ctx, args) => {
        try {
            const { id, faceCheckId } = args;

            await ctx.db.insert("faceCheck", {
                receivedId: id,
                faceCheckId,
            });

            console.log("[faceCheckId] FaceCheckId inserted", {
                receivedId: id,
                faceCheckId,
            });

        return {
            faceCheckId,
        };
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[faceCheckId] Error: ${error}`,
            });
        }
    }
})