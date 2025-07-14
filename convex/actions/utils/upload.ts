"use node";

import { ConvexError } from "convex/values";

export async function uploadToFaceCheck(blob: Blob): Promise<{ id_search: string }> {
    let form = new FormData();
    form.append("images", blob, "image.jpg");
    form.append("id_search", "");

    const response = await fetch("https://facecheck.id/api/upload_pic", {
        method: "POST",
        body: form,
        headers: {
            "accept": "application/json",
            "Authorization": `${process.env.FACECHECK_TOKEN}`
        }
    });

    if (!response.ok) {
        throw new ConvexError({
            code: "internal",
            message: `[FaceCheck] Error: ${response.statusText}`,
        });
    }

    const data = await response.json();
    return data;
} 