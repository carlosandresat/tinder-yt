"use server"

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { fullname, email, password, sex } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Este email ya está registrado" };
  }

  const user = await db.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
      sex,
    },
  });

  const verificationNumber = Math.floor(Math.random() * 1000000);
  const verificationCode = verificationNumber.toString().padStart(6, "0");

  await db.verificationToken.create({
    data: {
      userId: user.id,
      verificationCode,
    },
  });

  return { success: "¡Usuario creado!" };
};

export const isVerified = async (id: string | undefined) => {
  if(!id){
    return { error: "User not found" }
  }
  // Fetch the user's emailVerified field
  const user = await db.user.findUnique({
    where: { id },
    select: { emailVerified: true },
  });

  // Check if the user exists
  if (!user) {
    return { error: "User not found" };
  }

  // Determine if the user is verified
  if (user.emailVerified) {
    return { verified: true };
  } else {
    return { verified: false };
  }
};