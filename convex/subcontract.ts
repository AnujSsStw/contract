import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { subcontractsSchema, stepSchema } from "./schema";
import { Id } from "./_generated/dataModel";

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

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const subcontracts = await ctx.db.query("subcontracts").collect();
    return subcontracts;
  },
});

export const get = query({
  args: {
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { subId } = args;
    const subcontract = await ctx.db.get(subId);
    if (!subcontract) {
      return null;
    }
    if (!subcontract.projectId) {
      return null;
    }
    const project = (await ctx.db.get(subcontract.projectId)) || null;
    return {
      ...subcontract,
      project: project,
      costCode: subcontract.costCodeData,
    };
  },
});

export const deleteSubcontract = mutation({
  args: {
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { subId } = args;
    await ctx.db.delete(subId);
  },
});

export const getByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const { projectId } = args;
    const subcontracts = await ctx.db
      .query("subcontracts")
      .withIndex("byProjectId", (q) => q.eq("projectId", projectId))
      .collect();
    return subcontracts;
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
            projectName: data.projectName,
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
          // check if the code is being changed
          await ctx.db.patch(subId, {
            costCodes: data.costCodes,
            currentStep: step,
            scopeOfWork: data.scopeOfWork,
            costCodeData: data.costCodeData,
          });
          break;
        case "contract-value":
          await ctx.db.patch(subId, {
            contractValue: data.contractValue,
            contractValueText: data.contractValueText,
            currentStep: step,
          });
          break;
        case "scope-of-work":
          await ctx.db.patch(subId, {
            scopeOfWork: data.scopeOfWork,
            currentStep: step,
          });
          break;
        case "extra-info":
          await ctx.db.patch(subId, {
            exclusions: data.exclusions,
            costBreakdown: data.costBreakdown,
            currentStep: step,
          });
          break;
        case "attachments":
          await ctx.db.patch(subId, {
            attachments: data.attachments,
            currentStep: step,
          });
          break;
        case "preview":
          await ctx.db.patch(subId, {
            isDraft: data.isDraft,
            docusignSent: data.docusignSent,
            currentStep: step,
          });

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

export const getCostCodeById = query({
  args: { id: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.id) {
      return null;
    }
    const costCodeId = args.id as Id<"costCodes">;
    console.log("args.id", args.id);

    const costCode = await ctx.db.get(costCodeId);
    if (!costCode) {
      return null;
    }
    return costCode;
  },
});

export const getSuggestedScopes = query({
  args: {
    costCode: v.optional(v.array(v.id("costCodes"))),
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const { costCode, subId } = args;
    if (!costCode) {
      return null;
    }
    const costCodeDocs = await Promise.all(
      costCode.map(async (code) => {
        return await ctx.db.get(code);
      }),
    );
    if (!costCodeDocs) {
      return null;
    }
    const suggestedScopes = await Promise.all(
      costCodeDocs.map(async (code) => {
        if (!code) {
          return [];
        }
        return await ctx.db
          .query("scopeOfWorks")
          .withIndex("byCostCode", (q) => q.eq("cost_code", code.code))
          .collect();
      }),
    );
    const aiSuggestedScopes = await ctx.db.get(subId);
    return {
      costCode: costCodeDocs,
      suggestedScopes: suggestedScopes.flat(),
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
        cost_code: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const { scopeOfWork } = args;
    // prevent duplicates
    const existingScopes = await Promise.all(
      scopeOfWork.map(async (s) => {
        const existingScopes = await ctx.db
          .query("scopeOfWorks")
          .withIndex("byCostCode", (q) => q.eq("cost_code", s.cost_code))
          .collect();
        return existingScopes;
      }),
    );
    const costCodeDoc = await Promise.all(
      scopeOfWork.map(async (s) => {
        return ctx.db
          .query("costCodes")
          .withIndex("byCode", (q) => q.eq("code", s.cost_code))
          .first();
      }),
    );

    const p = scopeOfWork
      .filter((s) => s.type !== "suggested")
      .filter(
        (item) =>
          !existingScopes
            .flat()
            .some((s) => s.scope_of_work === item.text && s.type === item.type),
      )
      .map((s, index) => {
        const doc = costCodeDoc[index];
        if (!doc) {
          throw new Error(`Cost code document not found for index ${index}`);
        }
        return ctx.db.insert("scopeOfWorks", {
          cost_code: doc.code,
          category: doc.description,
          scope_of_work: s.text,
          type: s.type,
        });
      });
    const ids = await Promise.all(p);
    return ids;
  },
});
