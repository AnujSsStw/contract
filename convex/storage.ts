import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const removeFile = mutation({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.fileId);
  },
});
