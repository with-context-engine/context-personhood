import { ConvexError, v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { internalQuery } from "../_generated/server";

export const getStorageId = internalQuery({
  args: {
    id: v.id("received")
  },
  returns: v.id("_storage"),
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError({
        code: "internal",
        message: "Received ID not found",
      });
    }
    return document.storageId as Id<"_storage">;
  }
})