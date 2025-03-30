import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, query, QueryCtx } from "./_generated/server";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    return await getUserByCtx(ctx);
  },
});

export const getUserByCtx = async (ctx: QueryCtx | MutationCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return null;
  }
  return await ctx.db.get(userId);
};
