import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { format } from "date-fns";
import type { Prisma } from "@prisma/client";



interface IAppointmentsProps {
  date: string;
}

export type AppointmentsWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>

const fetchAppointments = async ({ date }: IAppointmentsProps): Promise<AppointmentsWithService[]> => {
  let activeDate = date
  if (!activeDate) {
    activeDate = format(new Date(), 'yyyy-MM-dd')
  }
  const { data } = await api.get(`/api/clinic/appointments?date=${activeDate}`);
  return data.appointments;
}

export const useGetAppointments = ({ date }: IAppointmentsProps) => {
  
  const queryClient = useQueryClient();
  
  const invalidateAppointmentQueries = () => {
    return queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
  };

  const { data: dataAppointments, isLoading: isLoadingAppointments, error: errorAppointments, refetch: refetchAppointments } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: () => fetchAppointments({ date }),
    staleTime: 20000,  // 20 seconds
    refetchInterval: 60000, // 1 minute
  })

  return {
    dataAppointments,
    isLoadingAppointments,
    errorAppointments,
    refetchAppointments,
    invalidateAppointmentQueries
  }
}