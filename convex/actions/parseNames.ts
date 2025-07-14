"use node";

import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { insertTopName } from "../mutations/insertTopName";
import { identifyTopName } from "./utils/topName";

export const parseNames = internalAction({
    args: {
        receivedId: v.id("received"),
        nameList: v.array(v.string()),
    },
    returns: v.object({
        name: v.string(),
    }),
    handler: async (ctx, args) => {
        const topName = await identifyTopName(args.nameList);
        await ctx.runMutation(internal.mutations.insertTopName.insertTopName, {
            receivedId: args.receivedId,
            topName: topName.name,
        });
        return {
            name: topName.name,
        };
    },
});