import { SubmitHandler } from 'react-hook-form';
import { ReminderForm, ReminderSchemaType } from './reminder-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '../../../../../components/ui/button';
import { Textarea } from '../../../../../components/ui/textarea';
import { createReminder } from '../../_actions/create-remimders';
import { toast } from 'sonner';

interface ReminderCardProps {
  closeDialog: () => void;
}

export function ReminderCard({ closeDialog }: ReminderCardProps) {
  const form = ReminderForm();
  const { handleSubmit, watch } = form;
  const onSubmit: SubmitHandler<ReminderSchemaType> = async data => {
    const response  = await createReminder({ description: data.description });
    if (response.error) {
      toast.error(response.error)
      return;
    }

    toast.success(response.data);
    form.reset();
    closeDialog();

  };
  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição do lembrete"
                    className="max-h-52 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!watch('description')}
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
          >
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
