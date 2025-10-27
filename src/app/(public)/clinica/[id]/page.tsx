
import { redirect } from "next/navigation";
import { getInfoSchedule } from "./_data-access/get-info-schedule";
import SchedulesContent from "./_components/schedules-content";

export default async function ClinicPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = (await params).id;
  const user = await getInfoSchedule({ userId });
  

  if(!user ) {
    redirect('/');
  }

  return <SchedulesContent clinic={user} />;
}
