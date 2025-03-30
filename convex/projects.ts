import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectsSchema } from "./schema";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: { data: v.object(projectsSchema) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    //   subject: "jx75sw44e8ptpr9edwz2z2zajd7c70sp|jh7ff65jwgtcm68w2y65n317z97c7xcz";
    // console.log(user.subject);

    await ctx.db.insert("projects", {
      ...args.data,
      createdBy: user.subject.split("|")[0] as Id<"users">,
      status: "planning",
      subcontractCount: 0,
    });
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    const p = projects.map(async (project) => {
      const subcontracts = await ctx.db
        .query("subcontracts")
        .withIndex("byProjectId", (q) => q.eq("projectId", project._id))
        .collect();
      return {
        ...project,
        subcontractCount: subcontracts.length,
      };
    });
    return await Promise.all(p);
  },
});

export const getById = query({
  args: { id: v.optional(v.string()) },
  handler: async (ctx, args) => {
    console.log(args.id);
    if (args.id === undefined || args.id === "undefined") {
      return null;
    }
    return await ctx.db.get(args.id as Id<"projects">);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    data: v.object({
      ...projectsSchema,
      status: v.optional(
        v.union(
          v.literal("planning"),
          v.literal("active"),
          v.literal("completed"),
        ),
      ),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.data);
  },
});
