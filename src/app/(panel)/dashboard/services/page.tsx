import { redirect } from 'next/navigation';
import getAuthSession from '../../../../hooks/get-auth-session';
import ServicesContent from './_components/services-content';

export default async function Services() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }
  return <ServicesContent userId={session.user?.id} />;
}
