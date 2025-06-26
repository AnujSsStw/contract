import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Type for PDF data
interface PdfData {
  architect_name: string;
  bond_needed: string;
  date: string;
  subcontractor_name: string;
  subcontractor_address_line_1: string;
  subcontractor_address_line_2: string;
  subcontractor_phone: string;
  contract_value: string;
  cost_breakdown: string[];
  cost_code: string[];
  exclusion: string[];
  project_name: string;
  project_address: string;
  project_generated_user: string;
  project_generated_user_email: string;
  project_number: string;
  scope_of_work: Array<{ type: string; text: string; cost_code: string }>;
  subcontract_number: string;
  project_owner_client_legal_name: string;
  divisions: Array<{
    _id: Id<"costCodes">;
    _creationTime: number;
    description: string;
    code: string;
  }>;
  subvContactName: string;
  subcontractor_company_name: string;
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    order: number;
  }>;
}

// Function to generate a hash from subcontract data
function generateDataHash(data: PdfData): string {
  // Create a stable string representation of the data
  const dataString = JSON.stringify(data, Object.keys(data).sort());

  // Simple hash function (you could use crypto.createHash in a real implementation)
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36); // Convert to base36 for shorter string
}

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

    const user = await ctx.db.get(subcontract.createdBy ?? project.createdBy);
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

export const updateSubcontractPdfHash = mutation({
  args: {
    subcontractId: v.id("subcontracts"),
    dataHash: v.string(),
    fileUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { subcontractId, dataHash, fileUrl } = args;
    await ctx.db.patch(subcontractId, {
      dataHash,
      pdfGeneratedAt: Date.now(),
      ...(fileUrl && { fileUrl }),
    });
  },
});

export const getSubcontractDataHash = query({
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

    const user = await ctx.db.get(subcontract.createdBy ?? project.createdBy);
    if (!user) {
      throw new Error("User not found");
    }

    // Create the data object that would be used for PDF generation
    const date = new Date(subcontract._creationTime).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    );

    const subcontract_number = `${project.number}-${subcontract.costCodeData?.map((c: { code: string }) => c.code).join("/")}`;

    const pdfData: PdfData = {
      architect_name: project.architect,
      bond_needed: project.bondsRequired === true ? "Yes" : "No",
      date,
      subcontractor_name: subcontract.contactName || "",
      subcontractor_address_line_1: subcontract.companyAddress || "",
      subcontractor_address_line_2: "",
      subcontractor_phone: subcontract.contactPhone || "",
      contract_value:
        `${subcontract.contractValueText}. ($${subcontract.contractValue})` ||
        "",
      cost_breakdown: subcontract.costBreakdown || [],
      cost_code:
        subcontract.costCodeData?.map((c: { code: string }) => c.code) || [],
      exclusion: subcontract.exclusions || [],
      project_name: project.name,
      project_address: project.address,
      project_generated_user: user.name || "",
      project_generated_user_email: user.email || "",
      project_number: project.number,
      scope_of_work: subcontract.scopeOfWork || [],
      subcontract_number,
      project_owner_client_legal_name: project.clientLegalEntity,
      divisions: costCodes
        .filter((c) => c !== null)
        .map((c) => ({
          _id: c!._id,
          _creationTime: c!._creationTime,
          code: c!.code,
          description: c!.description,
        })),
      subvContactName: subcontract.contactEmail || "",
      subcontractor_company_name: subcontract.companyName || "",
      attachments: subcontract.attachments || [],
    };

    const currentHash = generateDataHash(pdfData);
    const needsRegeneration =
      !subcontract.dataHash || subcontract.dataHash !== currentHash;

    return {
      currentHash,
      storedHash: subcontract.dataHash,
      needsRegeneration,
      pdfData,
    };
  },
});
