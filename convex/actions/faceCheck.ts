"use node";

import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";

if (!process.env.FACECHECK_TOKEN) {
    throw new Error("FACECHECK_TOKEN is not set");
}

export const faceCheck = internalAction({
    args: {
        id: v.id("received")
    },
    returns: v.object({
        url: v.string()
    }),
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

            let form = new FormData();
            form.append("images", blob, "image.jpg");
            form.append("id_search", "")

            const _response = await fetch("https://facecheck.id/api/upload_pic", {
                method: "POST",
                body: form,
                headers: {
                    "accept": "application/json",
                    "Authorization": `${process.env.FACECHECK_TOKEN}`
                }
            });

            if (!_response.ok) {
                throw new ConvexError({
                    code: "internal",
                    message: `[FaceCheck] Error: ${_response.statusText}`,
                });
            }

            const _data = await _response.json();
            console.log(_data);

            await ctx.runMutation(internal.mutations.faceCheckId.faceCheckId, {
                id: args.id,
                faceCheckId: _data.id_search,
            });

            return {
                url: ""
            };
        } catch (error) {
            throw new ConvexError({
                code: "internal",
                message: `[faceCheck] Error: ${error}`,
            });
        }
    }
});