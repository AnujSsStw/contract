import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const costCodesSchema = {
  code: v.string(),
  description: v.string(),
};

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
  status: v.optional(
    v.union(v.literal("planning"), v.literal("active"), v.literal("completed")),
  ),

  //subcontracts
  subcontractCount: v.number(),
};

export const stepSchema = v.union(
  v.literal("project-info"),
  v.literal("subcontractor-info"),
  v.literal("cost-code"),
  v.literal("contract-value"),
  v.literal("scope-of-work"),
  v.literal("extra-info"),
  v.literal("attachments"),
  v.literal("preview"),
);

export const subcontractsSchema = {
  projectId: v.optional(v.id("projects")),
  projectName: v.optional(v.string()),
  // subcontractorId: v.id("users"),

  //subcontractor quote details
  fileUrl: v.optional(v.string()), //if the subcontractor quote is uploaded as a file //TODO: remove this
  companyName: v.optional(v.string()),
  contactName: v.optional(v.string()),
  companyAddress: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),

  aiResponse: v.optional(v.any()),
  aiScopeOfWork: v.optional(v.any()),

  //cost codes
  costCodes: v.optional(v.array(v.id("costCodes"))),
  costCodeData: v.optional(v.array(v.object(costCodesSchema))),

  //contract value
  contractValue: v.optional(v.number()),
  contractValueText: v.optional(v.string()),

  //scope of work
  scopeOfWork: v.optional(
    v.array(
      v.object({
        type: v.string(),
        text: v.string(),
        cost_code: v.string(),
      }),
    ),
  ),

  //exclusions
  exclusions: v.optional(v.array(v.string())),

  //cost_breakdown
  costBreakdown: v.optional(v.array(v.string())),

  //attachments
  attachments: v.optional(
    v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        size: v.number(),
        type: v.string(),
        url: v.string(),
        order: v.number(),
      }),
    ),
  ),

  //current step
  currentStep: v.optional(stepSchema),

  //is draft
  isDraft: v.optional(v.boolean()),

  //docusign sent
  docusignSent: v.optional(v.boolean()),
  createdBy: v.optional(v.id("users")),

  // PDF generation tracking
  dataHash: v.optional(v.string()), // Hash of the data used to generate PDF
  pdfGeneratedAt: v.optional(v.number()), // Timestamp when PDF was last generated
};

const scopeOfWorksSchema = {
  cost_code: v.string(),
  category: v.string(),
  scope_of_work: v.string(),
  type: v.union(v.literal("manual"), v.literal("suggested"), v.literal("ai")),
};

// Document signing schemas
export const documentsSchema = {
  originalPdfUrl: v.string(),
  status: v.union(v.literal("pending"), v.literal("completed")),
  finalPdfUrl: v.optional(v.string()),
  createdBy: v.id("users"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
};

export const signersSchema = {
  documentId: v.id("documents"),
  email: v.string(),
  signingToken: v.string(),
  status: v.union(v.literal("pending"), v.literal("signed")),
  signedAt: v.optional(v.number()),
  userId: v.optional(v.id("users")),
  name: v.optional(v.string()),
};

export const signatureDataSchema = {
  signerId: v.id("signers"),
  pageNumber: v.number(),
  type: v.union(v.literal("signature"), v.literal("text"), v.literal("date")),
  data: v.string(), // Base64 for signature image, or text string
  positionX: v.number(),
  positionY: v.number(),
  width: v.number(),
  height: v.number(),
};

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  projects: defineTable(projectsSchemaWithCreatedBy),
  costCodes: defineTable(costCodesSchema).index("byCode", ["code"]),
  scopeOfWorks: defineTable(scopeOfWorksSchema)
    .index("byCostCode", ["cost_code"])
    .index("byScopeOfWork", ["scope_of_work"]),
  subcontracts: defineTable(subcontractsSchema).index("byProjectId", [
    "projectId",
  ]),
  // Document signing tables
  documents: defineTable(documentsSchema)
    .index("byStatus", ["status"])
    .index("byCreatedBy", ["createdBy"]),
  signers: defineTable(signersSchema)
    .index("byDocumentId", ["documentId"])
    .index("bySigningToken", ["signingToken"])
    .index("byEmail", ["email"])
    .index("byStatus", ["status"]),
  signatureData: defineTable(signatureDataSchema)
    .index("bySignerId", ["signerId"])
    .index("byPageNumber", ["pageNumber"]),
});
