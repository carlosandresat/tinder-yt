"use server";

import { db } from "@/lib/db";
import { WeeklyQuestionSchema } from "@/schemas";
import { z } from "zod";

export const answerQuestionA = async (
  userId: string,
  values: z.infer<typeof WeeklyQuestionSchema>
) => {
  const validatedFields = WeeklyQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { answer } = validatedFields.data;

  await db.weeklyAnswer.create({
    data: {
      userId,
      weeklyQuestion: "A",
      answer,
    },
  });

  return { success: "Respuesta ingresada correctamente" };
};
