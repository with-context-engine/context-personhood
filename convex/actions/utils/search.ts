"use node";

import { ConvexError, v } from "convex/values";

export async function retrieveFaceCheckResults(searchId: string): Promise<{ url: string; score: number; base64: string; }[]> {
    const payload = {
        "id_search": searchId,
        "with_progress": true,
        "status_only": false,
        "demo": false,
    }

    try {
        while (true) {
            const response = await fetch("https://facecheck.id/api/search", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `${process.env.FACECHECK_TOKEN}`
                }
            });
    
            if (!response.ok) {
                throw new ConvexError({
                    code: "internal",
                    message: `[retrieveFaceCheckResults] FaceCheck Response Error: ${response.statusText}`,
                });
            }

            const _data = await response.json();
            
            if (_data.error) {
                throw new ConvexError({
                    code: "internal",
                    message: `[retrieveFaceCheckResults] FaceCheck Data Error: ${_data.error}`,
                })
            }

            if (_data.output) {
                return _data.output.items.map((item: { url: string; score: number; base64: string; }) => ({
                    url: item.url,
                    score: item.score,
                    base64: item.base64,
                }));
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    } catch (error) {
        throw new ConvexError({
            code: "internal",
            message: `[retrieveFaceCheckResults] Error: ${error}`,
        });
    }
}