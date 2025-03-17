import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export const projectsSchema = {
  name: v.string(),
  number: v.string(),
  address: v.string(),
  clientName: v.string(),
  clientLegalEntity: v.string(),
  architect: v.string(),
  bondsRequired: v.boolean(),
  description: v.string(),
  subcontractCount: v.number(),
};

const projectsSchemaWithCreatedBy = {
  ...projectsSchema,
  createdBy: v.id("users"),
};

export type Project = typeof projectsSchema;

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  projects: defineTable(projectsSchemaWithCreatedBy),
});
