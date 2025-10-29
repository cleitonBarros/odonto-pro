'use client';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '../../../../../components/ui/badge';
import { type AppointmentsWithService, useGetAppointments } from '../../_query/useGetAppointments';
import { cancelAppointment } from '../../_actions/cancel-appointments';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '../../../../../components/ui/dialog';
import { AppointmentsContent } from './appointments-content';
import { DatePickerButton } from './buttion-date';

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailedAppointment, setDetailedAppointment] = useState<AppointmentsWithService | null>(null); 
  const searchParams = useSearchParams();
  const date = searchParams.get('date') as string;
  const {
    dataAppointments,
    isLoadingAppointments,
    refetchAppointments,
    invalidateAppointmentQueries,
  } = useGetAppointments({
    date,
  });
  const occupantMap: Record<string, AppointmentsWithService> = {};

  if (dataAppointments && dataAppointments.length > 0) {
    for (const appointment of dataAppointments) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);
      const startIndex = times.indexOf(appointment.time);
      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i;
          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment;
          }
        }
      }
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    invalidateAppointmentQueries();
    await refetchAppointments();
    toast.success(response.data);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold md:text-2xl">Agendamentos </CardTitle>
         <DatePickerButton />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] pr-4 lg:h-[calc(100vh-15rem)]">
            {isLoadingAppointments ? (
              <p>Carregando...</p>
            ) : (
              times.map(slot => {
                const occupant = occupantMap[slot];
                if (occupant && occupant.status === true) {
                  return (
                    <div
                      key={slot}
                      className="flex items-center justify-between border-t py-2 last:border-b"
                    >
                      <div className="w-16 text-sm font-semibold">{slot}</div>
                      <div className="flex-1 text-sm">
                        <p className="font-semibold">{occupant.name}</p>
                        <span className="text-gray-400">{occupant.phone}</span>
                      </div>
                      <Badge className="flex w-full max-w-12 items-center justify-center py-1 lg:max-w-26">
                        <p className="truncate">{occupant.service.name}</p>
                      </Badge>
                      <div className="flex flex-1 justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                            onClick={()=>setDetailedAppointment(occupant)}
                          >
                            <Eye size={16} className="text-white" />
                          </Button>
                        </DialogTrigger>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleCancelAppointment(occupant.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={slot} className="flex items-center border-t py-2 last:border-b">
                    <div className="w-16 text-sm font-semibold">{slot}</div>
                    <p className="flex-1 text-sm text-gray-400">Disponível</p>
                  </div>
                );
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <AppointmentsContent appointment={detailedAppointment} />
    </Dialog>
  );
}
