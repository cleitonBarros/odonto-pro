import { format } from 'date-fns';
import { Badge } from '../../../../../components/ui/badge';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../../../components/ui/dialog';
import type { AppointmentsWithService } from '../../_query/useGetAppointments';
import { formatCurrency } from '../../../../../utils/formatCurrency';

interface AppointmentsContentProps {
  appointment: AppointmentsWithService | null;
}
export function AppointmentsContent({ appointment }: AppointmentsContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do Agendamento</DialogTitle>
        <DialogDescription>Veja todos os detalhes do agendamento aqui.</DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {appointment && (
          <article>
            <p className="text-sm text-gray-600">Horario: {appointment.time}</p>
            <p className="mb-2 text-sm text-gray-600">
              Data:
              {new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(appointment.date))}
            </p>
            <p className="text-sm text-gray-600">Nome: {appointment.name}</p>
            <p className="text-sm text-gray-600">Email: {appointment.email}</p>
            <p className="mb-4 text-sm text-gray-600">Phone: {appointment.phone}</p>
            <section className="grid grid-cols-2 gap-2">
              <Badge className="w-full py-1">Serviço: {appointment.service.name}</Badge>
              <Badge className="w-full py-1">
                Preco: {formatCurrency(appointment.service.price / 100)}
              </Badge>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
