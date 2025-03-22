import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action, internalQuery, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const download = action({
  args: {
    subcontractId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { subcontractId } = args;
    const data: { subcontract: Doc<"subcontracts">; project: Doc<"projects"> } =
      await ctx.runQuery(api.download.getSubcontractDetails, {
        subcontractId,
      });

    return data;
  },
});

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
