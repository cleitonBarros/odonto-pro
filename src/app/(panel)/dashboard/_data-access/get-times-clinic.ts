"use server"

import prima from "@/lib/prisma"

export async function getTimesClinic({ userId }: { userId: string }) {
  if (!userId) {
    return {
      times: [],
      userId: ""
    }
  }

  try {
    const user = await prima.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        times: true
      }
    })

    if (!user) {
      return {
        times: [],
        userId: "null"
      }
    }

    return {
      times: user.times, userId: user.id
    }
  } catch (error) {
    return {
      times: [],
      userId: "error"
    }
  }
}