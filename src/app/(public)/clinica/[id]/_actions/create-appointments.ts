"use server"

import { z } from "zod";
import prisma from "../../../../../lib/prisma";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("O email é obrigatório"),
  phone: z.string().min(1, "O telefone é obrigatório"),
  date: z.date(),
  time: z.string().min(1, "O horário é obrigatório"),
  clinicId: z.string().min(1, "A clínica é obrigatória"),
  serviceId: z.string().min(1, "O serviço é obrigatório"),
});

export type CreateAppointmentData = z.infer<typeof formSchema>;

export async function CreateAppointment(formData: CreateAppointmentData) {

  const parsedData = formSchema.safeParse(formData)
  if (!parsedData.success) {
    return {
      error: parsedData.error.issues[0].message,
      success: false,
    }
  }

  try {
    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() 
    const day = selectedDate.getDate()

    const appointmentDateTime = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))

    const newAppointment =  await prisma.appointment.create({
      data:{
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         date: appointmentDateTime,
         time: formData.time,
         userId: formData.clinicId,
         serviceId: formData.serviceId,
      }
    })

    return {
      appointment: newAppointment,
      success: true,
    }

  } catch (error) {
    return {
      error: "Erro ao criar o agendamento.",
      success: false,
    }
  }

}
