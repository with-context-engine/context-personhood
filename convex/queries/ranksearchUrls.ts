import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const rankSearchUrls = internalQuery({
  args: {
    id: v.id("moondream"),
  },
  returns: v.array(
    v.object({
      id: v.string(),
      url: v.string(),
      score: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const urls = await ctx.db
      .query("faceCheckUrls")
      .filter((q) => q.eq(q.field("receivedId"), args.id))
      .collect();

    const filtered = urls
      .filter((u) => u.base64 != null)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.url.localeCompare(b.url);
      });

    return filtered.slice(0, 5).map(({ _id, url, score }) => ({ id: _id, url, score }));
  },
});