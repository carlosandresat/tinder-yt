"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema, VerificationFormSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { revalidatePath } from "next/cache";

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
  if (!id) {
    return { error: "User not found" };
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

export const verifyAccount = async (
  userId: string,
  data: z.infer<typeof VerificationFormSchema>
) => {
  // Validate the input data using Zod
  const parsedData = VerificationFormSchema.safeParse(data);

  if (!parsedData.success) {
    // Return validation errors
    return { error: "Invalid input data" };
  }

  const { pin } = parsedData.data;

  try {
    // Fetch the verification token for the user
    const verificationToken = await db.verificationToken.findUnique({
      where: { userId },
    });

    // Check if the verification token exists
    if (!verificationToken) {
      return { error: "No se ha encontrado tu Token de verificación" };
    }

    // Compare the provided code with the stored verification code
    if (verificationToken.verificationCode !== pin) {
      const newAttempts = verificationToken.attempts + 1;

      if (newAttempts >= 3) {
        // Reset attempts and generate a new verification code
        const verificationNumber = Math.floor(Math.random() * 1000000);
        const newVerificationCode = verificationNumber
          .toString()
          .padStart(6, "0");

        // Update the verification token with the new code and reset attempts
        await db.verificationToken.update({
          where: { userId },
          data: {
            verificationCode: newVerificationCode,
            attempts: 0,
            createdAt: new Date(), // Optionally update the createdAt timestamp
          },
        });

        console.error("Attemps excesed by: ", verificationToken.userId)
        return {
          error:
            "Código incorrecto. Se ha generado un nuevo código y será enviado a tu correo electrónico.",
        };
      } else {
        // Update the attempts count
        await db.verificationToken.update({
          where: { userId },
          data: {
            attempts: newAttempts,
          },
        });

        return { error: "Código de verificación incorrecto" };
      }
    }

    // Update the user's emailVerified field to the current date and time
    await db.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    });

    // Delete the verification token since it's no longer needed
    await db.verificationToken.delete({
      where: { userId },
    });

    revalidatePath("/home");
    return { success: "La verificación se ha completado correctamente" };
  } catch (error) {
    console.error("Error verifying account:", error);
    return {
      error:
        "Ha ocurrido un error desconocido, por favor contáctate con el administrador",
    };
  }
};
