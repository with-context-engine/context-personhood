"use node";

import { ConvexError } from "convex/values";

export function normalizeUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "https://");
}

export function extractHumanNamesFromExaResults(_results: any, urlToScore: Record<string, number>): { name: string, url: string, score: number }[] {
  let results: { name: string, url: string, score: number }[] = [];

  if (_results?.results) {
    for (const result of _results.results) {
      if (result.summary && result.url) {
        try {
          const summaryObj = JSON.parse(result.summary);
          if (Array.isArray(summaryObj.names)) {
            const score = urlToScore[normalizeUrl(normalizeUrl(result.url))];
            if (score === undefined) {
              console.warn(`[extractHumanNamesFromExaResults] Score not found for URL: ${result.url}`);
              continue;
            }
            for (const name of summaryObj.names) {
              results.push({ name, url: result.url, score });
            }
          }
        } catch (e) {
          throw new ConvexError({
            code: "internal",
            message: `[extractHumanNamesFromExaResults] Failed to parse summary for ${result.id}: ${e}`,
          });
        }
      }
    }
  }

  return results;
}