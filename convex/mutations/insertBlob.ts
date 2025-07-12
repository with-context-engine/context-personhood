import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertBlob = internalMutation({
    args: {
        storageId: v.string(),
        mimeType: v.string(),
        url: v.string(),
    },
    handler: async (ctx, args) => {
        const { storageId, mimeType, url } = args;

        await ctx.db.insert("received", {
            storageId,
            mimeType,
            url,
        });
    }
})