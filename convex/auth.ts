import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return {
          email: params.email as string,
          name: params.name as string,
          image: params.image as string,
        };
      },
    }),
  ],
  callbacks: {
    createOrUpdateUser: async (ctx, params) => {
      const { existingUserId, profile } = params;
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), existingUserId))
        .first();
      if (user) {
        return user;
      }

      return await ctx.db.insert("users", {
        name: profile.name,
        email: profile.email,
        image: profile.image,
      });
    },
  },
});
