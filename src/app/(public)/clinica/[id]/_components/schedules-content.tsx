/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import Image from 'next/image';
import Container from '../../../../../components/container';
import imagetest from '../../../../../../public/doctor.png';
import { MapPin } from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppointmentForm, type AppointmentFormData } from './schedules-form';
import { formatPhoneNumber } from '../../../../../utils/formatPhone';
import { DateTimePicker } from './date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import type { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { Spinner } from '../../../../../components/ui/spinner';
import { ScheduleTimeList } from './schedule-time-list';
import { CreateAppointment } from '../_actions/create-appointments';
import { toast } from 'sonner';
import { set } from 'zod';

type UserWithServicesAndSubscriptions = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface SchedulesContentProps {
  clinic: UserWithServicesAndSubscriptions;
}
export interface TimeSlot {
  time: string;
  available: boolean;
}
export default function SchedulesContent({ clinic }: SchedulesContentProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);
  const form = useAppointmentForm();
  const { handleSubmit, watch } = form;
  const selectedDate = watch('date');
  const selectedServiceId = watch('serviceId');
  const isDisabled =
    !selectedServiceId || !selectedDate || !watch('name') || !watch('email') || !watch('phone');

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setIsLoading(true);
      try {
        const dateString = date.toISOString().split('T')[0];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );

        const res = await response.json();
        setIsLoading(false);
        return res;
      } catch (error) {
        setIsLoading(false);
        return [];
      }
    },
    [clinic.id]
  );
  const onSubmit: SubmitHandler<AppointmentFormData> = async data => {
    if (!selectedTime) {
      toast.warning('Por favor, selecione um horário.');
      return;
    }
    const appointmentDate = {
      ...data,
      time: selectedTime,
      clinicId: clinic.id,
    };

    const response = await CreateAppointment(appointmentDate);

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success('Agendamento criado com sucesso!');
    form.reset();
    setSelectedTime('');
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then(blocked => {
        setBlockedTimes(blocked);
        const times = clinic.times || [];

        const finalSlots = times.map(time => ({
          time: time,
          available: !blocked.includes(time),
        }));

        setAvailableTimes(finalSlots);

        const stillAvailable = finalSlots.find(
          slot => slot.time === selectedTime && slot.available
        );

        if (!stillAvailable) {
          setSelectedTime('');
        }
      });
    }
  }, [fetchBlockedTimes, clinic.times, selectedTime, watch('date')]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-32 bg-emerald-500" />
      <Container as="section" className="-mt-16 px-4">
        <div className="mx-auto max-w-2xl">
          <article className="flex flex-col items-center">
            <div className="borde-white relative size-48 overflow-hidden rounded-full border-4 border-white">
              <Image
                src={clinic.image ? clinic.image : imagetest}
                alt="foto da clinica"
                className="object-cover"
                fill
              />
            </div>
            <h1 className="mb-2 text-2xl font-bold">{clinic.name} </h1>
            <div className="flex items-center gap-1.5">
              <MapPin size={24} />
              <span>{clinic.address}</span>
            </div>
          </article>
        </div>
      </Container>
      {/* Formulário de agendamento */}
      <Container as="section" className="mx-auto mt-6 max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-2 space-y-6 rounded-md border bg-white p-6 shadow-sm"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Nome completo:</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Digite seu nome completo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Email:</FormLabel>
                  <FormControl>
                    <Input id="email" placeholder="Digite seu email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      placeholder="(xx) xxxx-xxxx"
                      {...field}
                      onChange={e => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Data de agendamento:</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="h-10 w-full rounded-lg border p-2"
                      onChange={date => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Serviço:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {Math.floor(service.duration / 60)}h
                            {service.duration % 60}min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedServiceId && (
              <div className="space-y-2">
                <Label className="font-semibold">Horários disponíveis:</Label>
                <div className="rounded-kg bg-gray-100 p-4">
                  {isLoading ? (
                    <Spinner />
                  ) : availableTimes.length === 0 ? (
                    <p>Nenhum horário disponível</p>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={time => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      blockedTimes={blockedTimes}
                      availableTimeSlots={availableTimes}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      requiredSlots={
                        clinic.services.find(service => service.id === selectedServiceId)
                          ? Math.ceil(
                              clinic.services.find(service => service.id === selectedServiceId)!
                                .duration / 30
                            )
                          : 1
                      }
                    />
                  )}
                </div>
              </div>
            )}
            {clinic.status ? (
              <Button
                type="submit"
                className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={isDisabled}
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="px-4 py-3 text-center text-red-500">Clinica esta fechada no momento.</p>
            )}
          </form>
        </Form>
      </Container>
    </div>
  );
}
