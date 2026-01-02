"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function activateUser(userId: string, customRate: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        status: "ACTIVE",
        smsRate: customRate,
      },
    });
    revalidatePath("/axis/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Activation failed." };
  }
}
