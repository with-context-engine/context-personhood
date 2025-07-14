"use node";

import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { retrieveFaceCheckResults } from "./utils/search";
import { uploadToFaceCheck } from "./utils/upload";

if (!process.env.FACECHECK_TOKEN) {
    throw new Error("FACECHECK_TOKEN is not set");
}

export const faceCheck = internalAction({
    args: {
        id: v.id("received")
    },
    handler: async (ctx, args) => {
        try {
            const storageId = await ctx.runQuery(internal.queries.getStorageId.getStorageId, {
                id: args.id 
            });

            if (!storageId) {
                throw new ConvexError({
                    code: "internal",
                    message: `[faceCheck] StorageId not found`,
                });
            }

            const blob = await ctx.storage.get(storageId);

            if (!blob) {
                throw new ConvexError({
                    code: "internal",
                    message: `[faceCheck] Blob not found`,
                });
            }

            // Upload to FaceCheck API using utility
            const _data = await uploadToFaceCheck(blob);

            await ctx.runMutation(internal.mutations.insertFaceCheck.faceCheckId, {
                id: args.id,
                faceCheckId: _data.id_search,
            });

            console.log("[FaceCheck] FaceCheckId Inserted:", _data.id_search);

            // Return Results from FaceCheck
            const _results = await retrieveFaceCheckResults(_data.id_search);

            await ctx.runMutation(internal.mutations.insertFaceCheckUrls.insertFaceCheckUrls, {
                id: args.id,
                objects: _results,
            });

        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[faceCheck] Error: ${error}`,
            });
        }
    }
});