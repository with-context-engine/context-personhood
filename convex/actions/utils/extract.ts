"use node";

export function extractHumanNamesFromExaResults(_results: any): string[] {
  let allNames: string[] = [];

  if (_results?.results) {
    for (const result of _results.results) {
      if (result.summary) {
        try {
          const summaryObj = JSON.parse(result.summary);
          if (Array.isArray(summaryObj.names)) {
            allNames.push(...summaryObj.names);
          }
        } catch (e) {
          console.error(`Failed to parse summary for ${result.id}:`, e);
        }
      }
    }
  }

  return allNames;
}
