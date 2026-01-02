"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveUser(userId: string, rate: number, initialBalance: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        status: "ACTIVE",
        smsRate: rate,
        balance: initialBalance,
      },
    });
    
    revalidatePath("/axis/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to approve user" };
  }
}
