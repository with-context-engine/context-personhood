import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { internalMutation, MutationCtx } from "../_generated/server";

export const insertBlob = internalMutation({
    args: {
        receivedId: v.id("received"),
        storageId: v.string(),
        mimeType: v.string(),
        url: v.string(),
    },
    returns: v.object({
        id: v.id("moondream"),
    }),
    handler: async (
        ctx: MutationCtx,
        args,
    ): Promise<{ id: Id<"moondream"> }> => {
        const { receivedId, storageId, mimeType, url } = args;

        const _id = await ctx.db.insert("moondream", {
            receivedId,
            storageId,
            mimeType,
            url,
        });

        return {
            id: _id,
        };
    }
})