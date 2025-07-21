"use node";

import { ConvexError } from "convex/values";

export function normalizeUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "https://");
}

export function extractHumanNamesFromExaResults(
  _results: any,
  urlToIdScore: Record<string, { id: string, score: number }>
): { id: string, name: string, url: string, score: number }[] {
  let results: { id: string, name: string, url: string, score: number }[] = [];

  if (_results?.results) {
    for (const result of _results.results) {
      if (result.summary && result.url) {
        try {
          const summaryObj = JSON.parse(result.summary);
          if (Array.isArray(summaryObj.names)) {
            const normUrl = normalizeUrl(result.url);
            const idScore = urlToIdScore[normUrl];
            if (!idScore) {
              console.warn(`[extractHumanNamesFromExaResults] id/score not found for URL: ${result.url}`);
              continue;
            }
            for (const name of summaryObj.names) {
              results.push({ id: idScore.id, name, url: result.url, score: idScore.score });
            }
          }
        } catch (e) {
          throw new ConvexError({
            code: "internal",
            message: `[extractHumanNamesFromExaResults] Failed to parse summary for ${result.url}: ${e}`,
          });
        }
      }
    }
  }

  return results;
}