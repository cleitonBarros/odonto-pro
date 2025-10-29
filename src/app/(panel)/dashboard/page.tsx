import Container from '@/components/container';
import { redirect } from 'next/navigation';
import getAuthSession from '../../../hooks/get-auth-session';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Calendar } from 'lucide-react';
import { ButtonCopyLinks } from './_components/button-copy-links';
import { Reminders } from './_components/reminder/reminders';
import { Appointments } from './_components/appointments/appointments';

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="pt-6">
      <Container className="min-h-screen">
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/clinica/${session.user.id}`} target="_blank">
            <Button
              variant="default"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 md:flex-0"
            >
              <Calendar className="size-5" />
              <span>Novo Agendamento</span>
            </Button>
          </Link>
          <ButtonCopyLinks userId={session.user.id} />
        </div>
        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Appointments userId={session.user.id} />
          <Reminders userId={session.user.id} />
        </section>
      </Container>
    </div>
  );
}
