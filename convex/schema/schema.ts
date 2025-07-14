import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"

export default defineSchema({
    received: defineTable({
        mimeType: v.string(),
        storageId: v.id("_storage"),
        url: v.string(),
    }),
    faceCheck: defineTable({
        receivedId: v.id("received"),
        faceCheckId: v.string(),
    }),
    faceCheckUrls: defineTable({
        receivedId: v.id("received"),
        url: v.string(),
        score: v.number(),
    }).index("by_receivedId", ["receivedId"]),
})