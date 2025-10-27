import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Campo obrigatório' }),
  price: z.string().min(1, { message: 'Campo obrigatório' }),
  hours: z.string(),
  minutes: z.string(),
});

export interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({ initialValues }: UseDialogServiceFormProps) {
  const form = useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      price: '',
      hours: '',
      minutes: '',
    },
  });

  return form;
}
