'use server';

import { auth } from '../../../../../../auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.number().min(0, { message: 'Campo obrigatório' }),
  duration: z.number(),
  serviceId: z.string().min(1, { message: 'ID do serviço é obrigatório' }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export async function updateService(formData: FormSchemaType) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: 'Usuário não encontrado.',
    };
  }
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }
  try {
    await prisma.services.updateMany({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration < 30 ? 30 : formData.duration,
      },
    });

    revalidatePath('/dashboard/services');
    return { data: 'Serviço atualizado com sucesso' };
  } catch (error) {
    return {
      error: 'Falha ao atualizar o serviço.',
    };
  }
}
