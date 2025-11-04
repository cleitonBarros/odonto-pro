import { redirect } from 'next/navigation';
import { GridPlans } from './_components/grid-plans';
import getAuthSession from '../../../../hooks/get-auth-session';
import Container from '../../../../components/container';
import { getSubscription } from '../../../../utils/get-subscription';

export default async function Plans() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }

  const subscription = await getSubscription({ userId: session?.user?.id! });

  return (
    <div className="pt-6">
      <Container className="min-h-screen">
        {subscription?.status !== 'active' && <GridPlans />}
        {subscription?.status === 'active' && (<h1>voce tem um assinatura ativa</h1>)}

      </Container>
    </div>
  );
}
