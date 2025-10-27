import Container from '@/components/container';
import { getAllServices } from '../_data-access/get-all-services';
import ServicesList from './services-list';

interface IServicesContentProps {
  userId: string;
}
export default async function ServicesContent({ userId }: IServicesContentProps) {
  const { data } = await getAllServices({ userId });

  return (
    <Container className="mt-6 min-h-screen">
      <ServicesList services={data || []}/>
    </Container>
  );
}
