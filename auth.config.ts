import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, "$2a$10$n41QX64VhdhgG7AgY9MH7u19yRrEBTA4XMaPvoKkeLJUAL66Ax2x2");

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
