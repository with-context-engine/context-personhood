import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const rankSearchUrls = internalQuery({
  args: {
    id: v.id("received"),
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

    // Exclude social media URLs
    const filteredUrls = urls.filter(({ url }) => {
      const lowerUrl = url.toLowerCase();
      return !(
        lowerUrl.includes("twitter.com") ||
        lowerUrl.includes("facebook.com") ||
        lowerUrl.includes("instagram.com") ||
        lowerUrl.includes("x.com")
      );
    });

    filteredUrls.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.url.localeCompare(b.url);
    });

    return filteredUrls.slice(0, 5).map(({ url, score }) => ({ url, score }));
  },
});