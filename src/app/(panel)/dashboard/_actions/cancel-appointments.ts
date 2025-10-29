'use server';

import z from "zod";
import { auth } from "../../../../../auth";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";


const formAppointmentSchema = z.object({
  appointmentId: z.string().min(1, { message: 'ID do agendamento é obrigatório' }),
});

export type FormAppointmentSchemaType = z.infer<typeof formAppointmentSchema>;

export async function cancelAppointment(formData: FormAppointmentSchemaType) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Usuario nao autorizado '
    }
  }

  const schema = formAppointmentSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }
  try {
    await prisma.appointment.updateMany({
      where: {
        id: formData.appointmentId,
        userId: session.user.id,
      },
      data: {
        status: false
      },
    })

    revalidatePath('/dashboard');
    return { data: 'Agendamento cancelado com sucesso' };

  } catch (error) {
    return {
      error: 'Erro ao cancelar agendamento'
    }
  }
}