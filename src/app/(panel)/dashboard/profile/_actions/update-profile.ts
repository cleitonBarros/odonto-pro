"use server"

import { auth } from '../../../../../../auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timezone: z.string(),
  times: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchemaType) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado."
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: "Preencha todo os campos corretamente."
    }
  }

  try {
    await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timezone: formData.timezone,
        times: formData.times || [],
      },
    })

    revalidatePath("/dashboard/profile");
    
    return {
      data: "Perfil atualizado com sucesso!"
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Erro ao atualizar o perfil."
    }
  }


}