'use server';

import { auth } from '../../../../../../auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  serviceId: z.string().min(1, { message: 'ID do serviço é obrigatório' }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export async function deleteService(formData: FormSchemaType) {
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
    await prisma.services.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        status: false,
      },
    });

    revalidatePath('/dashboard/services');

    return { data: 'serviço deletado com sucesso' };

  } catch (error) {
    return {
      error: 'Falha ao deletar o serviço.',
    };
  }

  

  
}
