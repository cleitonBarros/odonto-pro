import Container from '@/components/container';
import { redirect } from 'next/navigation';
import getAuthSession from '../../../hooks/get-auth-session';

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="pt-6">
      <Container className="min-h-screen">
        <h1>Dashboard</h1>
      </Container>
    </div>
  );
}
