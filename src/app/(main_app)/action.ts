"use server";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@cvx/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export const createNewSubcontract = async (projectId?: string) => {
  const d = await fetchMutation(
    api.subcontract.create,
    {},
    { token: await convexAuthNextjsToken() },
  );
  redirect(`/subcontracts/new?subId=${d}&step=0&projectId=${projectId}`);
};
