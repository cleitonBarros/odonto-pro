/** biome-ignore-all lint/complexity/noUselessTernary: <ntonned> */
'use client';

import { type ProfileFormData, useProfileForm } from './profile-form';
import imageTeste from '../../../../../../public/doctor.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Image from 'next/image';
import Container from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { SubmitHandler } from 'react-hook-form';
import type { Prisma } from '@prisma/client';
import { updateProfile } from '../_actions/update-profile';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatPhoneNumber } from '@/utils/formatPhone';

type UserWithSubscriptions = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscriptions;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const route = useRouter();
  const { update } = useSession();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>(user.times || []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useProfileForm({
    name: user.name,
    address: user.address,
    status: user.status,
    phone: user.phone,
    timezone: user.timezone,
  });

  const { handleSubmit } = form;

  function generateTimeSlots(): string[] {
    const hours: string[] = [];
    for (let i = 8; i <= 18; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }

  function toggleHour(hour: string) {
    setSelectedTimeSlots(prev =>
      prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort()
    );
  }

  const timeZones = Intl.supportedValuesOf('timeZone').filter(
    zone =>
      zone.startsWith('America/Sao_Paulo') ||
      zone.startsWith('America/Brasilia') ||
      zone.startsWith('America/Rio_Branco') ||
      zone.startsWith('America/Manaus') ||
      zone.startsWith('America/Noronha')
  );

  const onSubmit: SubmitHandler<ProfileFormData> = async data => {
    const response = await updateProfile({
      name: data.name,
      address: data.address,
      status: data.status === 'active' ? true : false,
      phone: data.phone,
      timezone: data.timezone,
      times: selectedTimeSlots || [],
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.data);
  };

  async function handleSignOut() {
    await signOut();
    await update();
    route.replace('/');
  }
  return (
    <>
      <Container className="mt-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Meu perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative size-40 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={user.image || imageTeste}
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="digite o nome da clinica" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(XX) XXXXX-XXXX"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Endereço completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o endereco completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value ? 'active' : 'inactive'}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o status da clinica" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Ativo</SelectItem>
                              <SelectItem value="inactive">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <Label className="font-semibold">Configurar horários da clinica</Label>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Clique aqui para selecionar horários
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Horários da clinica</DialogTitle>
                          <DialogDescription>
                            Selecione abaixo os horários de funcionamento da clinica:
                          </DialogDescription>
                        </DialogHeader>

                        <section className="py-4">
                          <p className="mb-2 text-sm text-muted-foreground">
                            Clique nos horários abaixo para marcar ou desmcar:
                          </p>

                          <div className="grid grid-cols-5 gap-2">
                            {generateTimeSlots().map(hour => (
                              <Button
                                key={hour}
                                variant="outline"
                                className={cn(
                                  'h-10 cursor-pointer',
                                  selectedTimeSlots.includes(hour) &&
                                    'border-2 border-emerald-600 text-primary'
                                )}
                                onClick={() => toggleHour(hour)}
                              >
                                {hour}
                              </Button>
                            ))}
                          </div>
                        </section>
                        <Button
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => setDialogOpen(old => !old)}
                        >
                          Salvar horarios
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Fuso horário</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o fuso horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeZones.map(zone => (
                                <SelectItem key={zone} value={zone}>
                                  {zone}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                  >
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Container>
      <Button
        onClick={handleSignOut}
        className="m-3 w-fit cursor-pointer transition-all hover:scale-105 hover:bg-zinc-900"
      >
        Sair
        <LogOut />
      </Button>
    </>
  );
}
