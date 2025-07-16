import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const rankSearchUrls = internalQuery({
  args: {
    id: v.id("moondream"),
  },
  returns: v.array(
    v.object({
      url: v.string(),
      score: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const urls = await ctx.db
      .query("faceCheckUrls")
      .filter((q) => q.eq(q.field("receivedId"), args.id))
      .collect();

    // Sort by score (descending) and then by URL (ascending)
    urls.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.url.localeCompare(b.url);
    });

    return urls.slice(0, 5).map(({ url, score }) => ({ url, score }));
  },
});