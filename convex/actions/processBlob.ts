"use node";

import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";

export const processBlob = internalAction({
    args: {
        storageId: v.string(),
        mimeType: v.string(),
        url: v.string(),
    },
    returns: v.object({
        storageId: v.string(),
        success: v.boolean(),
    }),
    handler: async (ctx, args) => {
        try {
        await ctx.runMutation(internal.mutations.insertBlob.insertBlob, {
                storageId: args.storageId,
                mimeType: args.mimeType,
            url: args.url,
            });
        } catch (error) {
            console.error("[processBlob] Error inserting blob", error);
            return {
                storageId: args.storageId,
                success: false,
            };
        }
        console.log("[processBlob] Blob inserted into Received Table.", args.storageId);
        return {
            storageId: args.storageId,
            success: true,
        };
    }
})
