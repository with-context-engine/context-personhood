import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const getTopResults = internalQuery({
  args: {
    receivedId: v.id("moondream"),
  },
  returns: v.array(
    v.object({
      name: v.string(),
      score: v.number(),
      faceCheckUrlPhotoId: v.id("faceCheckUrls"),
    })
  ),
  handler: async (ctx: any, args: { receivedId: string }) => {
    // Get all faceCheckUrls ids for this receivedId
    const faceCheckUrls = await ctx.db
      .query("faceCheckUrls")
      .filter((q: any) => q.eq(q.field("receivedId"), args.receivedId))
      .collect();
    const validIds = new Set(faceCheckUrls.map((doc: any) => doc._id));

    // Get exaWebExtraction results for this receivedId
    const results = await ctx.db
      .query("exaWebExtraction")
      .filter((q: any) => q.eq(q.field("receivedId"), args.receivedId))
      .collect();

    // Filter to only those whose id is in validIds
    const filteredResults = results.filter((r: any) => validIds.has(r.id));

    if (filteredResults.length === 0) return [];

    filteredResults.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.url.localeCompare(b.url);
    });

    return filteredResults.map((r: any) => ({
      name: r.exaContentExtraction,
      score: r.score,
      faceCheckUrlPhotoId: r.id,
    }));
  },
});
