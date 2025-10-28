'use server';

import z from "zod";
import { auth } from "../../../../../auth";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";


const formReminderSchema = z.object({
  reminderId: z.string().min(1, { message: 'ID do lembrete é obrigatório' }),
});

export type FormReminderSchemaType = z.infer<typeof formReminderSchema>;

export async function deleteReminder(formData: FormReminderSchemaType) {

  const session = await auth()

  if (!session) {
    return {
      error: 'Usuario nao autorizado '
    }
  }


  const schema = formReminderSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: formData.reminderId,
      },
    });

    revalidatePath('/dashboard');

    return {
      data: "Lembrete deletado com sucesso"
    };
    
  } catch (error) {
    return {
      error: 'Erro ao deletar lembrete'
    }
  }



}
