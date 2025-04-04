"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { MatchFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/home");
    return { success: true };
  } catch (error) {
    console.error("Error inserting survey data:", error);
    return { error: "Error al guardar las respuestas" };
  }
}

export async function isAlreadyAnswered() {
  const session = await auth()

  const userId = session?.user?.id;
  if (!userId) {
    console.error("User not authenticated");
    return false;
  }

  const response = await db.response.findFirst({
    where: { userId },
  });

  return response !== null;
}

async function calculateMatchScore(userId1: string, userId2: string) {
  const questionsCount = 15; // Total number of questions in the survey
  const maxScore = 1000;

  // Fetch responses for both users
  const responses1 = await db.response.findMany({
    where: { userId: userId1 },
    include: { multipleChoices: true },
  });

  const responses2 = await db.response.findMany({
    where: { userId: userId2 },
    include: { multipleChoices: true },
  });

  let totalPoints = 0;

  for (let i = 0; i < questionsCount; i++) {
    const response1 = responses1.find((r) => r.questionId === i + 1);
    const response2 = responses2.find((r) => r.questionId === i + 1);

    if (!response1 || !response2) continue; // Skip unanswered questions

    if (response1.selectedOptionId !== null && response2.selectedOptionId !== null) {
      // SINGLE CHOICE QUESTION: 1 point if answers match
      if (response1.selectedOptionId === response2.selectedOptionId) {
        totalPoints += 1;
      }
    } else if (response1.multipleChoices.length > 0 && response2.multipleChoices.length > 0) {
      // MULTIPLE CHOICE QUESTION: Partial points based on matching options
      const options1 = new Set(response1.multipleChoices.map((r) => r.optionId));
      const options2 = new Set(response2.multipleChoices.map((r) => r.optionId));

      const intersection = [...options1].filter((opt) => options2.has(opt)).length;
      const maxOptions = Math.max(options1.size, options2.size);

      if (maxOptions > 0) {
        totalPoints += intersection / maxOptions;
      }
    } else if (response1.scaleValue !== null && response2.scaleValue !== null) {
      // SCALE BASED QUESTION: Reduced points based on difference
      const diff = Math.abs(response1.scaleValue - response2.scaleValue);
      totalPoints += (6 - diff) / 6; // 1 point if equal, decreasing by 1/6 per difference
    }
  }

  // Convert to 1000-point scale
  const finalScore = Math.round((totalPoints / questionsCount) * maxScore);

  // Store match result
  await db.match.upsert({
    where: { userId1_userId2: { userId1, userId2 } },
    update: { score: finalScore },
    create: { userId1, userId2, score: finalScore },
  });

  return finalScore;
}

export async function calculateAllMatches () {
  // Fetch all users with their profiles (to access sex & sexPreference)
  const users = await db.user.findMany({
    select: {
      id: true,
      sex: true,
      userProfile: { select: { sexPreference: true } },
    },
  });

  // Get all valid user pairs based on sex and sexPreference
  const validPairs: [string, string][] = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const userA = users[i];
      const userB = users[j];

      // Check if userA is interested in userB
      const aLikesB =
        userA.userProfile?.sexPreference === "both" ||
        userA.userProfile?.sexPreference === userB.sex;

      // Check if userB is interested in userA
      const bLikesA =
        userB.userProfile?.sexPreference === "both" ||
        userB.userProfile?.sexPreference === userA.sex;

      // Only match if both users are interested in each other
      if (aLikesB && bLikesA) {
        validPairs.push([userA.id, userB.id]);
      }
    }
  }

  // Compute and store matches in parallel
  await Promise.all(validPairs.map(([userId1, userId2]) => calculateMatchScore(userId1, userId2)));
}

export async function getTopMatches() {
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  // Fetch the top 15 matches for the user
  const matches = await db.match.findMany({
    where: {
      OR: [{ userId1: userId }, { userId2: userId }],
    },
    orderBy: { score: "desc" },
    take: 15,
    include: {
      user1: {
        select: {
          id: true,
          image: true,
          fullname: true,
          userProfile: { select: { description: true, contact: true } },
          responses: {
            where: { questionId: { in: [1, 2, 3] } },
            include: { multipleChoices: { include: { option: true } }, question: true },
          },
        },
      },
      user2: {
        select: {
          id: true,
          image: true,
          fullname: true,
          userProfile: { select: { description: true, contact: true } },
          responses: {
            where: { questionId: { in: [1, 2, 3] } },
            include: { multipleChoices: { include: { option: true } }, question: true },
          },
        },
      },
    },
  });


  return matches.map((match, index) => {
    // Determine the other user and unlock status
    const isUser1 = match.userId1 === userId;
    const otherUser = isUser1 ? match.user2 : match.user1;
    const unlocked =
      match.unlockedFor === "BOTH" ||
      (isUser1 && match.unlockedFor === "USER1") ||
      (!isUser1 && match.unlockedFor === "USER2");

    // Retrieve answers from responses
    const question1Response = otherUser.responses.find((r) => r.questionId === 1);
    const question2Response = otherUser.responses.find((r) => r.questionId === 2);
    const question3Response = otherUser.responses.find((r) => r.questionId === 3);

    return {
      tier: index + 1,
      unlocked,
      score: match.score,
      image: unlocked ? otherUser.image : null,
      name: unlocked ? otherUser.fullname : null,
      description: unlocked ? otherUser.userProfile?.description : null,
      contact: unlocked ? otherUser.userProfile?.contact : null,
      answers: {
        question1: question1Response?.selectedOptionId
          ? question1Response.multipleChoices[0]?.option.text
          : null,
        question2: question2Response
          ? question2Response.multipleChoices.map((choice) => choice.option.text)
          : [],
        question3: question3Response?.scaleValue ?? null,
      },
    };
  });
}