"use node";

import { ConvexError } from "convex/values";

export async function detectObjects({
  buffer,
}: {
  buffer: Buffer;
}): Promise<Blob> {
  const base64 = buffer.toString("base64");

  const response = await fetch(
    "https://with-context-engine-context-crop--context-cropping-api.modal.run/crop",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_base64: base64 }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new ConvexError(
      `[moondreamApi] API error: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  if (!data.result_base64) {
    throw new ConvexError("[moondreamApi] No result_base64 in response");
  }

  // Convert base64 to ArrayBuffer, then to Blob (jpeg)
  const resultBuffer = Buffer.from(data.result_base64, "base64");
  // Convex actions can use Blob from global
  return new Blob([resultBuffer], { type: "image/jpeg" });
}
