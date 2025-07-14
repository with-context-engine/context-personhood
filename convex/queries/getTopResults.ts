import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const getTopResults = internalQuery({
  args: {
    receivedId: v.id("received"),
  },
  returns: v.array(
    v.object({
      name: v.string(),
      score: v.number(),
    })
  ),
  handler: async (ctx: any, args: { receivedId: string }) => {
    const results = await ctx.db
      .query("exaWebExtraction")
      .filter((q: any) => q.eq(q.field("receivedId"), args.receivedId))
      .collect();

    if (results.length === 0) return [];

    results.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.url.localeCompare(b.url);
    });

    return results.map((r: any) => ({
      name: r.exaContentExtraction,
      score: r.score,
    }));
  },
});
