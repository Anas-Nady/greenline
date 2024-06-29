import CredentialsProviders from "next-auth/providers/credentials";
import login from "@/utils/login";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error(`Failed to login. Try again later.`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token.token = user.token;
      }
      return token;
    },
  },
  async session({ session, token }) {
    if (token) {
      session.user = token;
    }
    return session;
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
};
