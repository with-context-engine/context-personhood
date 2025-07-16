"use node";

import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { internalAction } from "../_generated/server";
import { detectObjects } from "./utils/modal";

export const moondreamCrop = internalAction({
    args: {
        receivedId: v.id("received"),
    },
    returns: v.object({
        id: v.id("moondream"),
    }),
    handler: async (ctx, args): Promise<{ id: Id<"moondream"> }> => {
        try {
            const storageId = await ctx.runQuery(internal.queries.getStorageId.getStorageId, {
                id: args.receivedId,
            })

            if (!storageId) {
                throw new ConvexError({
                    code: "internal",
                    message: `[moondreamCrop] StorageId not found`,
                });
            }
            const blob = await ctx.storage.get(storageId);

            if (!blob) {
                throw new ConvexError({
                    code: "internal",
                    message: `[moondreamCrop] Blob not found`,
                });
            }

            const _buffer = Buffer.from(await blob.arrayBuffer());

            const moondreamBlob = await detectObjects({
                buffer: _buffer,
            });

            const moondreamStorageId = await ctx.storage.store(moondreamBlob);
            const moondreamUrl = await ctx.storage.getUrl(moondreamStorageId);

            if (!moondreamUrl) {
                throw new ConvexError({
                    code: "internal",
                    message: `[moondreamCrop] Moondream URL not found`,
                });
            }

            if (moondreamUrl) {
                const { id } = await ctx.runMutation(internal.mutations.insertMoondreamBlob.insertBlob, {
                    receivedId: args.receivedId,
                    storageId: moondreamStorageId,
                    mimeType: moondreamBlob.type,
                    url: moondreamUrl,
                });

                return {
                    id,
                }
            }

            throw new ConvexError({
                code: "internal",
                message: `[moondreamCrop] Moondream URL not found`,
            });

        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[moondreamCrop] ${error}`,
            })
        }
    }

})