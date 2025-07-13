"use node";

import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { ActionCtx, internalAction } from "../_generated/server";

export const processBlob = internalAction({
    args: {
        storageId: v.id("_storage"),
        mimeType: v.string(),
        url: v.string(),
    },
    returns: v.object({
        id: v.id("received"),
        success: v.boolean(),
    }),
    handler: async (
        ctx: ActionCtx,
        args: { storageId: string; mimeType: string; url: string }
    ): Promise<{ id: Id<"received">; success: boolean }> => {
        try {
            const { id } = await ctx.runMutation(internal.mutations.insertBlob.insertBlob, {
                storageId: args.storageId,
                mimeType: args.mimeType,
                url: args.url,
            });

            return {
                id,
                success: true,
            };

        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[processBlob] Error inserting blob: ${error}`,
            });
        }
    }
})
