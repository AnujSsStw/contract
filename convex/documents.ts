import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Simple function to generate a signing token
function generateSigningToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
const baseUrl = process.env.SITE_URL || "http://localhost:3000";

// Create a new document for signing
export const create = mutation({
  args: {
    originalPdfUrl: v.string(),
    signers: v.array(
      v.object({
        email: v.string(),
        name: v.optional(v.string()),
      }),
    ),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    subcontractId: v.optional(v.id("subcontracts")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject.split("|")[0];

    // Create the document
    const documentId = await ctx.db.insert("documents", {
      originalPdfUrl: args.originalPdfUrl,
      status: "pending",
      createdBy: userId as Id<"users">,
      title: args.title,
      description: args.description,
      subcontractId: args.subcontractId,
    });

    // Create signers for the document
    const signingLinks = [];
    for (const signer of args.signers) {
      const signingToken = generateSigningToken();
      const signerId = await ctx.db.insert("signers", {
        documentId,
        email: signer.email,
        signingToken,
        status: "pending",
        name: signer.name,
      });

      signingLinks.push({
        email: signer.email,
        name: signer.name,
        url: `${baseUrl}/sign/${documentId}?token=${signingToken}`,
        signerId,
      });
    }

    return {
      documentId,
      signingLinks,
    };
  },
});

// Get document by ID
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.documentId);
  },
});

// Get signer by token
export const getSignerByToken = query({
  args: {
    documentId: v.id("documents"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const signer = await ctx.db
      .query("signers")
      .withIndex("bySigningToken", (q) => q.eq("signingToken", args.token))
      .filter((q) => q.eq(q.field("documentId"), args.documentId))
      .first();

    return signer;
  },
});

// Get all signers for a document
export const getSignersByDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("signers")
      .withIndex("byDocumentId", (q) => q.eq("documentId", args.documentId))
      .collect();
  },
});

// Get signature data for a document
export const getSignatureDataByDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const signers = await ctx.db
      .query("signers")
      .withIndex("byDocumentId", (q) => q.eq("documentId", args.documentId))
      .collect();

    const signatureData = [];
    for (const signer of signers) {
      const data = await ctx.db
        .query("signatureData")
        .withIndex("bySignerId", (q) => q.eq("signerId", signer._id))
        .collect();

      signatureData.push({
        signer,
        signatureData: data,
      });
    }

    return signatureData;
  },
});

// Save signature data
export const saveSignature = mutation({
  args: {
    documentId: v.id("documents"),
    token: v.string(),
    signatureData: v.array(
      v.object({
        pageNumber: v.number(),
        type: v.union(
          v.literal("signature"),
          v.literal("text"),
          v.literal("date"),
        ),
        data: v.string(),
        positionX: v.number(),
        positionY: v.number(),
        width: v.number(),
        height: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    // Validate token and get signer
    const signer = await ctx.db
      .query("signers")
      .withIndex("bySigningToken", (q) => q.eq("signingToken", args.token))
      .filter((q) => q.eq(q.field("documentId"), args.documentId))
      .first();

    if (!signer) {
      throw new Error("Invalid signing token");
    }

    if (signer.status === "signed") {
      throw new Error("Document already signed by this user");
    }

    // Save signature data
    for (const data of args.signatureData) {
      await ctx.db.insert("signatureData", {
        signerId: signer._id,
        ...data,
      });
    }

    // Update signer status
    await ctx.db.patch(signer._id, {
      status: "signed",
      signedAt: Date.now(),
    });

    // Check if all signers have signed
    const allSigners = await ctx.db
      .query("signers")
      .withIndex("byDocumentId", (q) => q.eq("documentId", args.documentId))
      .collect();

    const allSigned = allSigners.every((s) => s.status === "signed");

    if (allSigned) {
      // Update document status to completed
      await ctx.db.patch(args.documentId, {
        status: "completed",
      });
    }

    return { success: true, allSigned };
  },
});

// Get pending documents for a user
export const getPendingDocuments = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const signers = await ctx.db
      .query("signers")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();

    const documents = [];
    for (const signer of signers) {
      const document = await ctx.db.get(signer.documentId);
      if (document) {
        documents.push({
          ...document,
          signer,
        });
      }
    }

    return documents;
  },
});

// Get documents created by the current user
export const getMyDocuments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
      // throw new Error("Not authenticated");
    }

    const userId = identity.subject.split("|")[0];

    return await ctx.db
      .query("documents")
      .withIndex("byCreatedBy", (q) => q.eq("createdBy", userId as Id<"users">))
      .collect();
  },
});

// Generate final signed PDF
export const generateSignedPdf = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.status !== "completed") {
      throw new Error("Document is not fully signed");
    }

    // Get all signature data for the document
    const signers = await ctx.db
      .query("signers")
      .withIndex("byDocumentId", (q) => q.eq("documentId", args.documentId))
      .collect();

    const allSignatureData = [];
    for (const signer of signers) {
      const data = await ctx.db
        .query("signatureData")
        .withIndex("bySignerId", (q) => q.eq("signerId", signer._id))
        .collect();

      allSignatureData.push(...data);
    }

    // TODO: Implement PDF generation logic here
    // This would involve:
    // 1. Downloading the original PDF from the URL
    // 2. Using pdf-lib to add signatures and text
    // 3. Uploading the final PDF to storage
    // 4. Updating the document with the final PDF URL

    return {
      success: true,
      signatureData: allSignatureData,
      originalPdfUrl: document.originalPdfUrl,
    };
  },
});

export const getDocumentsBySubcontractId = query({
  args: { subcontractId: v.id("subcontracts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("bySubcontractId", (q) =>
        q.eq("subcontractId", args.subcontractId),
      )
      .collect();
  },
});
