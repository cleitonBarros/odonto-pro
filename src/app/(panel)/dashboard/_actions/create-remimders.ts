'use server';

import z from "zod";
import { auth } from "../../../../../auth";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";



const formSchema = z.object({
  description: z.string().min(1, { message: 'Descrição do lembrete é obrigatória' }),
});

export type FormReminderSchemaData = z.infer<typeof formSchema>;

export async function createReminder(formData: FormReminderSchemaData) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Usuario nao autorizado '
    }
  }


  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await prisma.reminder.create({
      data: {
        description: formData.description,
        userId: session.user.id,
      },
    })


    revalidatePath('/dashboard');
    return {
      data: "Lembrete criado com sucesso"
    }

  } catch (error) {
    return {
      error: 'Erro ao criar lembrete'
    }
  }

}