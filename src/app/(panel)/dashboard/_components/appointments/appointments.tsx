import { getTimesClinic } from '../../_data-access/get-times-clinic';
import { AppointmentsList } from './apointmentss-list';


export async function Appointments({ userId }: { userId: string }) {
  const user = await getTimesClinic({ userId });

  return <AppointmentsList times={user.times} />;
}
