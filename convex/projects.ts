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
    });
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
