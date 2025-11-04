import { redirect } from 'next/navigation';
import getAuthSession from '../../../../hooks/get-auth-session';
import ServicesContent from './_components/services-content';
import { Suspense } from 'react';

export default async function Services() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent userId={session.user?.id} />
    </Suspense>
  );
}
