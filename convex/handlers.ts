import { ConvexError } from "convex/values";
import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server";

export const helloHandler = httpAction(async (ctx, request) => {
	return new Response(JSON.stringify({ message: "Hello, world!" }), {
		status: 200,
	});
});

export const receiveImageHandler = httpAction(async (ctx, request) => {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }

    if (!image.type.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "File must be an image" }), {
        status: 400,
      });
    }

    const arrayBuffer = await image.arrayBuffer();

    console.log("[receiveImageHandler] Image received", {
      size: arrayBuffer.byteLength,
      type: image.type,
    });

    // Create a Blob from the ArrayBuffer and store the image
    const blob = new Blob([arrayBuffer], { type: image.type });
    const storageId = await ctx.storage.store(blob);
    const url = await ctx.storage.getUrl(storageId);
        
    // Process the Blob
    if (url) {
      const result = await ctx.runAction(
        internal.actions.processBlob.processBlob,
        {
          storageId,
          mimeType: image.type,
          url,
        }
      )

      // TODO:
      // 1. Process the image with Moondream
      // 2. Create a mutation to store the image in the database
      // 3. Return the Id of the image manipulated by Moondream to the next step

      const moondreamId = await ctx.runAction(internal.actions.moondream.moondreamCrop, {
        receivedId: result.id,
      });

      if (!moondreamId) {
        throw new ConvexError({
          code: "internal",
          message: `[receiveImageHandler] Moondream ID not found`,
        });
      }

      console.log("[receiveImageHandler] Image processed", moondreamId);

      await ctx.runAction(internal.actions.faceCheck.faceCheck, {
        id: moondreamId.id,
      });

      console.log("[receiveImageHandler] FaceCheck Run.");

      const ranked = await ctx.runQuery(internal.queries.ranksearchUrls.rankSearchUrls, {
        id: moondreamId.id,
      });

      console.log("[receiveImageHandler] Ranked", ranked);

      await ctx.runAction(internal.actions.exaWebsets.exaWebsetsExtraction, {
        receivedId: moondreamId.id,
        objects: ranked,
      });

      const _topResults = await ctx.runQuery(internal.queries.getTopResults.getTopResults, {
        receivedId: moondreamId.id,
      });

      const person = await ctx.runAction(internal.actions.parseNames.parseNames, {
        receivedId: moondreamId.id,
        nameList: _topResults,
      });

      console.log("[receiveImageHandler] Person", person);

      return new Response(
        `That's ${person.name} ${person.score}% likely.`,
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain",
          }
        }
      )
    }

    return new Response(
      `Cannot identify.`,
      {
        status: 200,
      }
    )

  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Processing failed: ${String(e)}` }),
      { status: 500 }
    );
  }
});