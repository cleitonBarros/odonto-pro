'use server';

import { auth } from '../../../../../../auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.number().min(0, { message: 'Campo obrigatório' }),
  duration: z.number(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export async function createNewService(formData: FormSchemaType) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado."
    }
  } 
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    const newService = await prisma.services.create({
      data:{
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      }
    })

    revalidatePath('/dashboard/services');
    return { data: newService };
  

  } catch (error) {
    return {
      error: "Erro ao criar o serviço."
    }
  }
}