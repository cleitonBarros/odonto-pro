/** biome-ignore-all lint/correctness/useParseIntRadix: <no need> */
'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { Pencil, Plus, X } from 'lucide-react';
import { type DialogServiceFormData, useDialogServiceForm } from './dialog-service-form';
import { Input } from '../../../../../components/ui/input';
import type { SubmitHandler } from 'react-hook-form';
import { convertRealToCents } from '../../../../../utils/convertCurrency';
import { createNewService } from '../_actions/create-service';
import { toast } from 'sonner';
import type { Services } from '@prisma/client';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { deleteService } from '../_actions/delete-service';
import { updateService } from '../_actions/update-service';
import { set } from 'zod';

interface IServicesListProps {
  services: Services[];
}

export default function ServicesList({ services }: IServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Services | null>(null);
  const form = useDialogServiceForm({
    initialValues: {
      name: '',
      price: '',
      hours: '',
      minutes: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = form;

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    event.target.value = value;
    form.setValue('price', value);
  }

  const onSubmit: SubmitHandler<DialogServiceFormData> = async data => {
    setLoading(true);
    const priceInCents = convertRealToCents(data.price);
    const hours = parseInt(data.hours) || 0;
    const minutes = parseInt(data.minutes) || 0;
    const totalDurationInMinutes = hours * 60 + minutes;

    if (editingService) {
      await editServiceById({
        serviceId: editingService.id,
        name: data.name,
        priceInCents,
        duration: totalDurationInMinutes,
      });
      setLoading(false);
      return;
    }

    const response = await createNewService({
      name: data.name,
      price: priceInCents,
      duration: totalDurationInMinutes,
    });

    setLoading(false);

    if (response.error) {
      toast.error('Erro ao criar serviço');
      return;
    }

    setIsDialogOpen(false);
    form.reset();
    setEditingService(null);
    toast.success('Serviço criado com sucesso!');
  };

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId });

    if (response.error) {
      toast.error('Erro ao deletar o serviço');
      return;
    }

    toast.success(response.data);
  }

  async function handleUpdateService(service: Services) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId,
      name,
      price: priceInCents,
      duration,
    });

    if (response.error) {
      toast.error(response.error);
      setLoading(false);
      return;
    }
    setIsDialogOpen(false);
    setEditingService(null);
    form.reset();
    toast.success(response.data);
  }

  useEffect(() => {
    if (editingService) {
      form.setValue('name', editingService.name);
      form.setValue('price', (editingService.price / 100).toFixed(2).replace('.', ','));
      form.setValue('hours', Math.floor(editingService.duration / 60).toString());
      form.setValue('minutes', (editingService.duration % 60).toString());
    } else {
      form.reset({
        name: '',
        price: '',
        hours: '',
        minutes: '',
      });
    }
  }, [editingService, form]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold md:text-2xl">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button size="icon" className="cursor-pointer bg-emerald-600 hover:bg-emerald-500">
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={e => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>Adicione um novo serviço ao seu catálogo.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-semibold">Nome do Serviço</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o nome do serviço" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-semibold">Preço do Serviço</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ex: 120,00" onChange={changeCurrency} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="font-semibold">Tempo de duração do serviço:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="hours"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-semibold">Horas:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="1" min="0" type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minutes"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-semibold">Minutos:</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="0" min="0" type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-emerald-600 font-semibold text-white hover:bg-emerald-500"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      `${editingService ? 'Atualizar serviço' : 'Adicionar serviço'}`
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </CardHeader>
          <CardContent>
            <section className="mt-4 space-y-4">
              {services.map(service => (
                <article key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center justify-between space-x-2">
                    <h4 className="font-medium capitalize">{service.name}</h4>
                    <span className="text-gray-500">-</span>
                    <p className="text-gray-400">{formatCurrency(service.price / 100)}</p>
                  </div>
                  <div>
                    <Button
                      variant={'outline'}
                      size={'icon-sm'}
                      onClick={() => handleUpdateService(service)}
                      className="mr-3 cursor-pointer"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant={'destructive'}
                      size={'icon-sm'}
                      onClick={() => handleDeleteService(service.id)}
                      className="cursor-pointer"
                    >
                      <X />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
