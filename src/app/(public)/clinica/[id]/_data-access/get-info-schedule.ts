"use server";

import prisma from "../../../../../lib/prisma";

interface ScheduleInfo {
  userId: string
}

export async function getInfoSchedule({ userId }: ScheduleInfo) {

  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        subscription: true,
        services: {
          where: {
            status: true
          }
        },
      }
    })

    if (!user) {
      return null;
    }

    return user;

  } catch (err) {

  }

}