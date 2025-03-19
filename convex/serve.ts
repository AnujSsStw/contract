"use node";
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const genSubContPrompt = `
You are a helpful assistant that extracts information from a PDF. Your task is to carefully analyze the PDF content and extract the following information. Return the results in a valid JSON format with the following structure:

{
  "companyName": "string or null if not found",
  "contactName": "string or null if not found",
  "companyAddress": "string or null if not found",
  "contactEmail": "string or null if not found",
  "contactPhone": "string or null if not found",
  "scopeOfWork": ["array of strings describing scope items or empty array if not found"],
}

Important guidelines:
1. If a field is not found in the PDF, use null for string fields or empty array for scopeOfWork
2. Make sure the output is valid JSON that can be parsed
3. Extract complete information - for example, full address including street, city, state, and zip code
4. For scopeOfWork, break down the work items into clear, separate points
5. Format phone numbers consistently as: XXX-XXX-XXXX
6. Ensure email addresses are in valid format
7. Remove any special characters or formatting that could break JSON parsing

Please analyze the provided PDF and return only the JSON object with the extracted information.`;

//subcontractor quote details
export const generateSubcontractorQuoteDetails = action({
  args: {
    base64Pdf: v.string(),
    subId: v.id("subcontracts"),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { base64Pdf } = args;
    try {
      const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_file",
                filename: `subcontractor_quote_${args.subId}.pdf`,
                file_data: base64Pdf,
              },
              {
                type: "input_text",
                text: genSubContPrompt,
              },
            ],
          },
        ],
        user: userId.subject.split("|")[0],
      });

      await ctx.runMutation(api.subcontract.addAiResponse, {
        subId: args.subId,
        aiResponse: response.output_text,
        aiScopeOfWork: parseJsonFromCodeBlock(response.output_text).scopeOfWork,
      });

      return parseJsonFromCodeBlock(response.output_text);
    } catch (e) {
      console.error("Error generating subcontractor quote details:", e);
      throw new Error("Error generating subcontractor quote details");
    }
  },
});

const genScopeOfWorkPrompt = `
You are a helpful assistant that extracts information from a PDF. Your task is to carefully analyze the PDF content and extract the following information. Return the results in a valid JSON format with the following structure:

{
  "scopeOfWork": ["array of strings describing scope items or empty array if not found"],
}

Important guidelines:
1. If a field is not found in the PDF, use null for string fields or empty array for scopeOfWork
2. Make sure the output is valid JSON that can be parsed
3. For scopeOfWork, break down the work items into clear, separate points

Please analyze the provided PDF and return only the JSON object with the extracted information.`;

export const generateScopeOfWork = action({
  args: {
    subId: v.id("subcontracts"),
    base64Pdf: v.string(),
  },
  handler: async (ctx, args) => {
    const { subId, base64Pdf } = args;
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    try {
      const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_file",
                filename: `subcontractor_quote_${subId}.pdf`,
                file_data: base64Pdf,
              },
              {
                type: "input_text",
                text: genScopeOfWorkPrompt,
              },
            ],
          },
        ],
        user: userId.subject.split("|")[0],
      });

      await ctx.runMutation(api.subcontract.addAiResponse, {
        subId: args.subId,
        aiResponse: response.output_text,
        aiScopeOfWork: parseJsonFromCodeBlock(response.output_text).scopeOfWork,
      });

      return parseJsonFromCodeBlock(response.output_text).scopeOfWork;
    } catch (e) {
      console.error("Error generating subcontractor quote details:", e);
      throw new Error("Error generating subcontractor quote details");
    }
  },
});

function parseJsonFromCodeBlock(text: string) {
  // Remove the starting ```json and ending ``` markers
  const jsonContent = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");

  try {
    // Parse the extracted JSON content
    return JSON.parse(jsonContent);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
}
