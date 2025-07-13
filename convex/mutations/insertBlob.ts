import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { internalMutation, MutationCtx } from "../_generated/server";

export const insertBlob = internalMutation({
    args: {
        storageId: v.string(),
        mimeType: v.string(),
        url: v.string(),
    },
    returns: v.object({
        id: v.id("received"),
    }),
    handler: async (
        ctx: MutationCtx,
        args: { storageId: string; mimeType: string; url: string }
    ): Promise<{ id: Id<"received"> }> => {
        const { storageId, mimeType, url } = args;

        const _id = await ctx.db.insert("received", {
            storageId,
            mimeType,
            url,
        });

        return {
            id: _id,
        };
    }
})