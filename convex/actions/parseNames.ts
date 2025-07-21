"use node";

import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction, internalQuery } from "../_generated/server";
import { convertToJpeg } from "./utils/convert";
import { identifyTopName } from "./utils/topName";

export const parseNames = internalAction({
    args: {
        receivedId: v.id("moondream"),
        nameList: v.array(
            v.object({
                name: v.string(),
                score: v.number(),
                faceCheckUrlPhotoId: v.id("faceCheckUrls"),
            })
        ),
    },
    returns: v.object({
        name: v.string(),
        score: v.number(),
        photoUrl: v.string(),
        width: v.number(),
        height: v.number(),
    }),
    handler: async (ctx, args) => {
        const { name, score, faceCheckUrlPhotoId } = await identifyTopName(args.nameList);
        const _photoString = await ctx.runQuery(internal.queries.getPhotoString.getPhotoString, {
            id: faceCheckUrlPhotoId,
        });
        const _photoBlob = await convertToJpeg({
            string: _photoString,
        });
        const { blob, width, height } = _photoBlob;
        const _photoStorageId = await ctx.storage.store(blob);
        const _photoUrl = await ctx.storage.getUrl(_photoStorageId);
        if (!_photoUrl) {
            throw new ConvexError({
                code: "internal",
                message: `[parseNames] Photo URL not found`,
            });
        }
        console.log("[parseNames] Here's what we got:", {
            name,
            score,
            photoUrl: _photoUrl,
            faceCheckUrlPhotoId,
            width,
            height,
        });
        await ctx.runMutation(internal.mutations.insertTopName.insertTopName, {
            receivedId: args.receivedId,
            topName: name,
            score: score,
            photoUrl: _photoUrl,
            faceCheckUrlPhotoId: faceCheckUrlPhotoId,
        });
        return {
            name: name,
            score: score,
            photoUrl: _photoUrl,
            width: width,
            height: height,
        };
    },
});