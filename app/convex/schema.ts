import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    privyDid: v.string(),
    email: v.optional(v.string()),
    name: v.string(),
    createdAt: v.string(),
  }).index('by_privyDid', ['privyDid']),
})
