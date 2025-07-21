import { ConvexError, v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { internalQuery } from "../_generated/server";

export const getPhotoString = internalQuery({
    args: {
        id: v.id("faceCheckUrls"),
    },
    returns: v.string(),
    handler: async (ctx, args) => {
        const photo = await ctx.db.get(args.id);
        if (!photo) {
            throw new ConvexError({
                code: "internal",
                message: `[getPhotoString] Photo not found`,
            });
        }
        return photo.base64;
    }
})