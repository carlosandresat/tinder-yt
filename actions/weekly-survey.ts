"use server";

import { db } from "@/lib/db";
import { WeeklyMultipleQuestionSchema, WeeklyQuestionSchema } from "@/schemas";
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

export const answerQuestionB = async (
  userId: string,
  values: z.infer<typeof WeeklyMultipleQuestionSchema>
) => {
  const validatedFields = WeeklyMultipleQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { answer } = validatedFields.data;

  await db.weeklyAnswer.createMany({
    data: answer.map((value) => {
      return { userId, weeklyQuestion: "B", answer: value };
    }),
  });

  return { success: "Respuesta ingresada correctamente" };
};

export const getWeeklyAnswersData = async () => {
  // Fetch counts for all questions
  const results = await db.weeklyAnswer.groupBy({
    by: ["weeklyQuestion", "answer"],
    _count: {
      _all: true,
    },
  });

  // Initialize empty data structures
  const question1data: { [key: string]: number } = {};
  const question2data: { [key: string]: number } = {};

  // Populate the counts
  results.forEach((result) => {
    const optionKey = `option${result.answer}`;
    if (result.weeklyQuestion === "A") {
      question1data[optionKey] = result._count._all;
    } else if (result.weeklyQuestion === "B") {
      question2data[optionKey] = result._count._all;
    }
  });

  // Ensure all options are present, even if counts are zero
  for (let i = 1; i <= 7; i++) {
    const optionKey = `option${i}`;
    if (!(optionKey in question1data)) {
      question1data[optionKey] = 0;
    }
  }
  for (let i = 1; i <= 4; i++) {
    const optionKey = `option${i}`;
    if (!(optionKey in question2data)) {
      question2data[optionKey] = 0;
    }
  }

  return {
    question1data,
    question2data,
  };
};
