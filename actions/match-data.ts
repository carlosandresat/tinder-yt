"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { MatchFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function updateImage(url:string){
  const session = await auth()
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
  const session = await auth()
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
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
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
      { id: 2, value: question2, type: "SINGLE_CHOICE" },
      { id: 3, value: question3, type: "SINGLE_CHOICE" },
      { id: 4, value: question4, type: "SINGLE_CHOICE" },
      { id: 5, value: question5, type: "MULTIPLE_CHOICE" },
      { id: 6, value: question6, type: "MULTIPLE_CHOICE" },
      { id: 7, value: question7, type: "MULTIPLE_CHOICE" },
      { id: 8, value: question8, type: "MULTIPLE_CHOICE" },
      { id: 9, value: question9, type: "SCALE_BASED" },
      { id: 10, value: question10, type: "SCALE_BASED" },
      { id: 11, value: question11, type: "SCALE_BASED" },
      { id: 12, value: question12, type: "SCALE_BASED" },
      { id: 13, value: question13, type: "SCALE_BASED" },
      { id: 14, value: question14, type: "SCALE_BASED" },
      { id: 15, value: question15, type: "SCALE_BASED" },
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

export async function calculateMatchScoreForUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const userId = session.user.id;
  // Fetch all users except the current user
  const users = await db.user.findMany({
    where: { id: { not: userId } },
    select: {
      id: true,
      sex: true,
      userProfile: { select: { sexPreference: true } },
    },
  });

  // Get all valid user pairs based on sex and sexPreference
  const validPairs: [string, string][] = [];
  const userA = users.find((user) => user.id === userId);
  if (!userA) return; // Skip if userA not found
  for (let i = 0; i < users.length; i++) {
    const userB = users[i];
    if (!userB) continue; // Skip if userB not found
    if (userA.id === userB?.id) continue; // Skip if same user

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

  // Compute and store matches in parallel
  await Promise.all(
    validPairs.map(([userId1, userId2]) =>
      calculateMatchScore(userId1, userId2)
    )
  );
  // Revalidate the path to ensure the latest data is fetched
  revalidatePath("/home");
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
  const session = await auth()

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
            where: { questionId: { in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] } },
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
            where: { questionId: { in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] } },
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
    const question4Response = otherUser.responses.find((r) => r.questionId === 4);
    const question5Response = otherUser.responses.find((r) => r.questionId === 5);
    const question6Response = otherUser.responses.find((r) => r.questionId === 6);
    const question7Response = otherUser.responses.find((r) => r.questionId === 7);
    const question8Response = otherUser.responses.find((r) => r.questionId === 8);
    const question9Response = otherUser.responses.find((r) => r.questionId === 9);
    const question10Response = otherUser.responses.find((r) => r.questionId === 10);
    const question11Response = otherUser.responses.find((r) => r.questionId === 11);
    const question12Response = otherUser.responses.find((r) => r.questionId === 12);
    const question13Response = otherUser.responses.find((r) => r.questionId === 13);
    const question14Response = otherUser.responses.find((r) => r.questionId === 14);
    const question15Response = otherUser.responses.find((r) => r.questionId === 15);

    return {
      matchId: match.id,
      tier: index + 1,
      unlocked,
      score: match.score,
      image: unlocked ? otherUser.image : null,
      name: unlocked ? otherUser.fullname : null,
      description: unlocked && otherUser.userProfile ? otherUser.userProfile.description : null,
      contact: unlocked && otherUser.userProfile ? otherUser.userProfile.contact : null,
      answers: {
        question1: question1Response?.selectedOptionId
          ? question1Response.selectedOptionId.toString()
          : null,
        question2: question2Response?.selectedOptionId
          ? question2Response.selectedOptionId.toString()
          : null,
        question3: question3Response?.selectedOptionId   
          ? question3Response.selectedOptionId.toString()
          : null,
        question4: question4Response?.selectedOptionId
          ? question4Response.selectedOptionId.toString()
          : null,
        question5: question5Response
          ? question5Response.multipleChoices.map((choice) => choice.optionId.toString())
          : [],
        question6: question6Response
          ? question6Response.multipleChoices.map((choice) => choice.optionId.toString())
          : [],
        question7: question7Response
          ? question7Response.multipleChoices.map((choice) => choice.optionId.toString())
          : [],
        question8: question8Response
          ? question8Response.multipleChoices.map((choice) => choice.optionId.toString())
          : [],
        question9: question9Response?.scaleValue ?? null,
        question10: question10Response?.scaleValue ?? null,
        question11: question11Response?.scaleValue ?? null,
        question12: question12Response?.scaleValue ?? null,
        question13: question13Response?.scaleValue ?? null,
        question14: question14Response?.scaleValue ?? null,
        question15: question15Response?.scaleValue ?? null,
      },
    };
  });
}

export async function unlockMatch(matchId: number) {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.availableUnlocks <= 0) {
      throw new Error("No unlocks available");
    }

    // Check if user is user1 or user2 in the match, and update the unlockedFor field accordingly
    const match = await db.match.findUnique({
      where: { id: matchId },
    });
    if (!match) {
      throw new Error("Match not found");
    }
    const isUser1 = match.userId1 === userId;
    const isUser2 = match.userId2 === userId;
    if (!isUser1 && !isUser2) {
      throw new Error("User not part of the match");
    }
    if (match.unlockedFor === "BOTH") {
      throw new Error("Match already unlocked for both users");
    }
    if (isUser1 && match.unlockedFor === "USER1") {
      throw new Error("Match already unlocked for you");
    }
    if (isUser2 && match.unlockedFor === "USER2") {
      throw new Error("Match already unlocked for you");
    }
    if (isUser1 && match.unlockedFor === "USER2") {
      await db.match.update({
        where: { id: matchId },
        data: { unlockedFor: "BOTH" },
      });
    }
    if (isUser2 && match.unlockedFor === "USER1") {
      await db.match.update({
        where: { id: matchId },
        data: { unlockedFor: "BOTH" },
      });
    }
    if (isUser1 && match.unlockedFor === "NONE") {
      await db.match.update({
        where: { id: matchId },
        data: { unlockedFor: "USER1" },
      });
    }
    if (isUser2 && match.unlockedFor === "NONE") {
      await db.match.update({
        where: { id: matchId },
        data: { unlockedFor: "USER2" },
      });
    }

    // Deduct a unlock from the user
    await db.user.update({
      where: { id: userId },
      data: { availableUnlocks: user.availableUnlocks - 1 },
    });

    revalidatePath("/home");
  } catch (error) {
    console.error("Error unlocking match:", error);
    throw new Error("Error unlocking match");
  }
}

export async function getAvailableUnlocks() {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { availableUnlocks: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.availableUnlocks;
  } catch (error) {
    console.error("Error fetching available unlocks:", error);
    throw new Error("Error fetching available unlocks");
  }
}