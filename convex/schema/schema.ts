import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  exaWebExtraction: defineTable({
    exaContentExtraction: v.string(),
    receivedId: v.id("received"),
    url: v.string(),
    score: v.number(),
  }),
  faceCheck: defineTable({
    faceCheckId: v.string(),
    receivedId: v.id("received"),
  }),
  faceCheckUrls: defineTable({
    receivedId: v.id("received"),
    score: v.float64(),
    url: v.string(),
  }).index("by_receivedId", ["receivedId"]),
  received: defineTable({
    mimeType: v.string(),
    storageId: v.id("_storage"),
    url: v.string(),
  }),
  topName: defineTable({
    receivedId: v.id("received"),
    topName: v.string(),
    score: v.number(),
  }),
});