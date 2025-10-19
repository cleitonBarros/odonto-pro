"use server"

import prisma from "@/lib/prisma";

interface IGETUserDataProps {
  userId: string
}

export async function getUserData({ userId }: IGETUserDataProps) {
  try {

    if (!userId) {
      throw new Error('User ID is required');
    }
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        subscription: true
      }
    })
    if (!user) {
      throw new Error('User not found');
    }

    return user;

  } catch (error) {
    throw new Error(`Error fetching user data: ${(error as Error).message}`);
  }
}