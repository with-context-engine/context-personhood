"use node";

import { ConvexError } from "convex/values";

export async function convertToJpeg({
  string,
}: {
  string: string;
}): Promise<{ blob: Blob; width: number; height: number }> {
  const response = await fetch(
    "https://with-context-engine-context-crop--context-cropping-api.modal.run/convert",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data_url: string }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new ConvexError(
      `[convertToJpeg] API error: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  if (!data.jpeg_base64) {
    throw new ConvexError("[convertToJpeg] No result_base64 in response");
  }

  // Convert base64 to ArrayBuffer, then to Blob (jpeg)
  const resultBuffer = Buffer.from(data.jpeg_base64, "base64");
  // Convex actions can use Blob from global
  const blob = new Blob([resultBuffer], { type: "image/jpeg" });
  const width = data.width;
  const height = data.height;
  return { blob, width, height };
}
