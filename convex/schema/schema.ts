import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"


export default defineSchema({
    received: defineTable({
        mimeType: v.string(),
        storageId: v.string(),
        url: v.string(),
    }),
})