import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ProfileFormDataProps = {
  name: string | null;
  address: string | null;
  status: boolean;
  phone: string | null;
  timezone: string | null;
};

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Campo obrigatório' }),
  address: z.string().optional(),
  status: z.string(),
  phone: z.string().optional(),
  timezone: z.string().min(1, { message: 'Campo obrigatório' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({ address, status, phone, timezone, name }: ProfileFormDataProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || '',
      address: address || '',
      status: status ? 'active' : 'inactive',
      phone: phone || '',
      timezone: timezone || '',
    },
  });

  return form;
}
