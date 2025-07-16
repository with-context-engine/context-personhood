"use node";

import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { identifyTopName } from "./utils/topName";

export const parseNames = internalAction({
    args: {
        receivedId: v.id("moondream"),
        nameList: v.array(
            v.object({
                name: v.string(),
                score: v.number(),
            })
        ),
    },
    returns: v.object({
        name: v.string(),
        score: v.number(),
    }),
    handler: async (ctx, args) => {
        const { name, score } = await identifyTopName(args.nameList);
        await ctx.runMutation(internal.mutations.insertTopName.insertTopName, {
            receivedId: args.receivedId,
            topName: name,
            score: score,
        });
        return {
            name: name,
            score: score,
        };
    },
});