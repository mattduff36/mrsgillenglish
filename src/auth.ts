import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { authConfig } from "@/auth.config";
import { loginAllowed, registerLoginAttempt } from "@/lib/auth/rate-limit";
import { findAdminAccount } from "@/lib/auth/accounts";
import { isAuthConfigured } from "@/lib/content/config";

const DUMMY_HASH =
  "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!isAuthConfigured()) return null;
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        const key = `login:${email}`;
        if (!loginAllowed(key)) return null;

        const account = findAdminAccount(email);
        const ok = await compare(password, account ? account.hash : DUMMY_HASH);
        if (!account || !ok) {
          registerLoginAttempt(key);
          return null;
        }
        return { id: account.email, email: account.email, name: "Admin" };
      },
    }),
  ],
});
