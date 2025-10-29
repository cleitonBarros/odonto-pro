'use client';

import type { Reminder } from '@prisma/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { ScrollArea } from '../../../../../components/ui/scroll-area';
import { deleteReminder } from '../../_actions/delete-remimders';
import { toast } from 'sonner';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '../../../../../components/ui/dialog';
import { ReminderCard } from './reminder-content';
import { useState } from 'react';

interface ReminderListProps {
  reminder: Reminder[];
}

export default function ReminderList({ reminder }: ReminderListProps) {
  const [isOpen, setIsOpen] = useState(false);
  async function handleDelete(id: string) {
    const response = await deleteReminder({ reminderId: id });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
  }

  return (
    <aside className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold md:text-2xl">Lembretes</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size={'icon'}
                variant="ghost"
                className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4 text-amber-50" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo lembrete</DialogTitle>
                <DialogDescription>Criar um novo lembrete para sua lista</DialogDescription>
              </DialogHeader>
              <ReminderCard closeDialog={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {reminder.length === 0 && (
            <p className="text-sm text-gray-500">Nenhum lembrete encontrado.</p>
          )}
          <ScrollArea className="h-86 w-full flex-1 pr-0 lg:max-h-[calc(100vh-15rem)]">
            {reminder.map(item => (
              <article
                key={item.id}
                className="mb-2 flex flex-row items-center justify-between gap-2 rounded-xl bg-amber-200 px-3 py-2.5"
              >
                <div className="">
                  <p className="text-justify text-sm lg:text-base">{item.description} </p>
                </div>
                <Button
                  size={'icon'}
                  className="cursor-pointer rounded-full bg-red-500 p-2 shadow-none hover:bg-red-400"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </article>
            ))}
          </ScrollArea>

          <ScrollArea></ScrollArea>
        </CardContent>
      </Card>
    </aside>
  );
}
