import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { subcontractsSchema, stepSchema } from "./schema";

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }

    //TODO: add creator
    const id = await ctx.db.insert("subcontracts", {});
    return id;
  },
});

export const get = query({
  args: {
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { subId } = args;
    const subcontract = await ctx.db.get(subId);
    if (!subcontract) {
      throw new Error("Subcontract not found");
    }
    return subcontract;
  },
});

export const bulkUpdateOrCreate = mutation({
  args: {
    data: v.object(subcontractsSchema),
    step: stepSchema,
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { data, step, subId } = args;
    const subcontract = await ctx.db.get(subId);

    if (subcontract) {
      // update the subcontract
      switch (step) {
        case "project-info":
          await ctx.db.patch(subId, {
            projectId: data.projectId,
            currentStep: step,
          });
          break;
        case "subcontractor-info":
          await ctx.db.patch(subId, {
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            contactEmail: data.contactEmail,
            fileUrl: data.fileUrl,
            currentStep: step,
          });
          break;
        case "cost-code":
          await ctx.db.patch(subId, {
            costCode: data.costCode,
            currentStep: step,
          });
          break;
        case "contract-value":
          await ctx.db.patch(subId, {
            contractValue: data.contractValue,
            currentStep: step,
          });
          break;
        case "scope-of-work":
          await ctx.db.patch(subId, {
            scopeOfWork: data.scopeOfWork,
            currentStep: step,
          });
          break;
        case "attachments":
          await ctx.db.patch(subId, { fileUrl: data.fileUrl });
          break;
        case "preview":
          //   await ctx.db.patch(subId, { ...data });
          break;
      }
    } else {
      // create the subcontract
      await ctx.db.insert("subcontracts", { ...data });
    }
  },
});

export const addAiResponse = mutation({
  args: {
    subId: v.id("subcontracts"),
    aiResponse: v.any(),
    aiScopeOfWork: v.any(),
  },
  handler: async (ctx, args) => {
    const { subId, aiResponse, aiScopeOfWork } = args;
    await ctx.db.patch(subId, { aiResponse, aiScopeOfWork });
  },
});

export const getCostCodes = query({
  args: {},
  handler: async (ctx) => {
    const costCodes = await ctx.db.query("costCodes").collect();
    return costCodes;
  },
});

export const getSuggestedScopes = query({
  args: {
    costCode: v.optional(v.id("costCodes")),
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { costCode, subId } = args;
    if (!costCode) {
      return null;
    }
    const costCodeDoc = await ctx.db.get(costCode);
    if (!costCodeDoc) {
      return null;
    }
    const suggestedScopes = await ctx.db
      .query("scopeOfWorks")
      .withIndex("byCostCode", (q) => q.eq("cost_code", costCodeDoc.code))
      .collect();
    const aiSuggestedScopes = await ctx.db.get(subId);
    return {
      costCode: costCodeDoc,
      suggestedScopes,
      aiSuggestedScopes: aiSuggestedScopes?.aiScopeOfWork,
    };
  },
});

export const addScopeOfWork = mutation({
  args: {
    scopeOfWork: v.array(
      v.object({
        type: v.union(
          v.literal("manual"),
          v.literal("suggested"),
          v.literal("ai"),
        ),
        text: v.string(),
      }),
    ),
    costCode: v.id("costCodes"),
  },
  handler: async (ctx, args) => {
    const { scopeOfWork, costCode } = args;
    const costCodeDoc = await ctx.db.get(costCode);
    if (!costCodeDoc) {
      throw new Error("Cost code not found");
    }
    const p = scopeOfWork
      .filter((s) => s.type !== "manual")
      .map((s) => {
        return ctx.db.insert("scopeOfWorks", {
          cost_code: costCodeDoc.code,
          category: costCodeDoc.description,
          scope_of_work: s.text,
          type: s.type,
        });
      });
    const ids = await Promise.all(p);
    return ids;
  },
});
