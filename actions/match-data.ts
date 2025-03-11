"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { MatchFormSchema } from "@/schemas";

const session = await auth()

export async function updateImage(url:string){
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        image: url,
      },
    });
  } catch (error) {
    console.error("Could not update user", (error as Error).message);
    throw new Error("Could not update user");
  }
}

export async function insertMatchData(values: z.infer<typeof MatchFormSchema>) {
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = MatchFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    description,
    contact,
    sexPreference,
    question1,
    question2,
    question3,
  } = validatedFields.data;

  try {
    // Store personal data if needed
    await db.userProfile.upsert({
      where: { userId },
      update: { description, contact, sexPreference },
      create: { userId, description, contact, sexPreference },
    });

    const questions = [
      { id: 1, value: question1, type: "SINGLE_CHOICE" },
      { id: 2, value: question2, type: "MULTIPLE_CHOICE" },
      { id: 3, value: question3, type: "SCALE_BASED" },
    ];
    for (const question of questions) {
      if (question.value === undefined || question.value === null) continue;
      const response = await db.response.create({
        data: {
          userId,
          questionId: question.id,
          scaleValue: question.type === "SCALE_BASED" && !Array.isArray(question.value) ? question.value : null,
          selectedOptionId: question.type === "SINGLE_CHOICE" && !Array.isArray(question.value) ? question.value : null,
        },
      });

      if (question.type === "MULTIPLE_CHOICE" && Array.isArray(question.value)) {
        await db.responseOption.createMany({
          data: question.value.map((optionId: number) => ({
            responseId: response.id,
            optionId,
          })),
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Error inserting survey data:", error);
    return { error: "Error al guardar las respuestas" };
  }
}