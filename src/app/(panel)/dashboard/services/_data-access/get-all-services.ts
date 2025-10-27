import prisma from "@/lib/prisma"

export async function getAllServices({ userId }: { userId: string }) {

  if (!userId) {
    return {
      error: "falha ao obter serviços"
    }
  }

  try {
    const services = await prisma.services.findMany({
      where: { userId, status: true },
    })

    return { data: services }

  } catch (error) {
    return {
      error: "falha ao obter serviços"
    }
  }
}