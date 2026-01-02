"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCredits(userId: string, amount: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    revalidatePath("/axis/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Credit injection failed." };
  }
}
