import { v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const getSubcontractDetails = query({
  args: {
    subcontractId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const subcontract = await ctx.db.get(args.subcontractId);
    if (!subcontract || !subcontract.projectId) {
      throw new Error("Subcontract not found");
    }

    // Fetch project and user in parallel
    const [project, costCodes] = await Promise.all([
      ctx.db.get(subcontract.projectId),
      subcontract.costCodes
        ? Promise.all(
            subcontract.costCodes.map(async (costCode) => {
              return await ctx.db.get(costCode);
            }),
          )
        : [],
    ]);

    if (!project) {
      throw new Error("Project not found");
    }

    const user = await ctx.db.get(project.createdBy);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      subcontract,
      costCodes: costCodes.filter((c) => c !== null) as {
        _id: Id<"costCodes">;
        _creationTime: number;
        description: string;
        code: string;
      }[],
      project,
      user,
    };
  },
});

export const generateUploadUrl = action({
  args: {
    subcontractId: v.id("subcontracts"),
    mergedPdf: v.any(),
  },
  handler: async (ctx, args) => {
    // Store the image in Convex
    const storageId: Id<"_storage"> = await ctx.storage.store(args.mergedPdf);

    const url = new URL(`${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`);
    url.searchParams.set("storageId", storageId as Id<"_storage">);

    await ctx.scheduler.runAfter(0, internal.download.addSubcontractUrl, {
      subcontractId: args.subcontractId,
      url: url.href,
    });
  },
});

export const addSubcontractUrl = internalMutation({
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

// export const mutationThatSchedulesAction = mutation({
//   args: { subcontractId: v.id("subcontracts"), mergedPdf: v.any() },
//   handler: async (ctx, { subcontractId, mergedPdf }) => {
//     await ctx.scheduler.runAfter(0, internal.download.generateUploadUrl, {
//       subcontractId,
//       mergedPdf,
//     });
//   },
// });
