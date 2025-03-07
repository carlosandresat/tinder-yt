"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

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