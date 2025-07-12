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

    // Check MIME type
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
    
    console.log("[receiveImageHandler] Image stored", {
      storageId,
      size: arrayBuffer.byteLength,
      mimeType: image.type,
    });
    
    if (url) {
      const _result = await ctx.runAction(
        internal.actions.processBlob.processBlob,
        {
          storageId,
          mimeType: image.type,
          url,
        }
      )
      console.log("[receiveImageHandler] Image processed", _result);
    }

    return new Response(
        `Received!`,
        {
            status: 200,
            headers: {
                "Content-Type": "text/plain",
            }
        }
    )

  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Processing failed: ${String(e)}` }),
      { status: 500 }
    );
  }
});