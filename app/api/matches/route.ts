import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
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
              include: {
                multipleChoices: { include: { option: true } },
                question: true,
              },
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
              include: {
                multipleChoices: { include: { option: true } },
                question: true,
              },
            },
          },
        },
      },
    });

    const response = matches.map((match, index) => {
      // Determine the other user and unlock status
      const isUser1 = match.userId1 === userId;
      const otherUser = isUser1 ? match.user2 : match.user1;
      const unlocked =
        match.unlockedFor === "BOTH" ||
        (isUser1 && match.unlockedFor === "USER1") ||
        (!isUser1 && match.unlockedFor === "USER2");

      // Retrieve answers from responses
      const question1Response = otherUser.responses.find(
        (r) => r.questionId === 1
      );
      const question2Response = otherUser.responses.find(
        (r) => r.questionId === 2
      );
      const question3Response = otherUser.responses.find(
        (r) => r.questionId === 3
      );

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
            ? question2Response.multipleChoices.map(
                (choice) => choice.option.text
              )
            : [],
          question3: question3Response?.scaleValue ?? null,
        },
      };
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
