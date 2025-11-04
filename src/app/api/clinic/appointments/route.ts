import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "../../../../lib/prisma";

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string
  const clinicId = request.auth?.user?.id

  if(!dateString) {
    return NextResponse.json({ error: "Data é obrigatória" }, { status: 400 })
  }

  if (!clinicId) {
    return NextResponse.json({ error: "Usuario não encontrado" }, { status: 404 })
  }


  try {
    const [year, month, day] = dateString.split("-").map(Number)
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))

    const appointments = await prisma.appointment.findMany({
      where:{
        userId: clinicId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        service: true,
        
      },
    })
    return NextResponse.json({ appointments }, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 })
  }
});