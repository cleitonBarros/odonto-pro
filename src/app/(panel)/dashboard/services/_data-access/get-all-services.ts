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

    const availableServices = services.reduce((acc, service) => {
      // Criar uma chave baseada no nome do serviço (sem espaços e maiúsculo)
      const key = service.name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
      acc[key] = service.name;
      return acc;
    }, {} as Record<string, string>);
    
    return { data: services, availableServices }

  } catch (error) {
    return {
      error: "falha ao obter serviços"
    }
  }
}