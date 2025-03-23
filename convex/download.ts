import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSubcontractDetails = query({
  args: {
    subcontractId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const subcontract = await ctx.db.get(args.subcontractId);
    if (!subcontract || !subcontract.projectId) {
      throw new Error("Subcontract not found");
    }

    const project = await ctx.db.get(subcontract.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await ctx.db.get(project.createdBy);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      subcontract,
      project,
      user,
    };
  },
});

export const addSubcontractUrl = mutation({
  args: {
    subcontractId: v.id("subcontracts"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const { subcontractId, url } = args;
    await ctx.db.patch(subcontractId, {
      fileUrl: url,
    });
  },
});
