import Container from '@/components/container';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import clinicImg from '../../../../public/doctor.png';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Profissionais() {
  return (
    <div className="bg-gray-50 py-16">
      <Container as="section" className="px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">Clinicas disponíveis</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <div>
                <div className="relative h-48">
                  <Image src={clinicImg} alt="Foto da clinica" fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Clinica centro</h3>
                    <p className="text-sm text-gray-500">Rua x, centro, Campo Grande - MS</p>
                  </div>

                  <span className="size-2.5 rounded-full bg-emerald-500" />
                </div>

                <Link
                  href="/clinica/123"
                  className="flex w-full items-center justify-center rounded-md bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-400 md:text-base"
                >
                  Agendar horário
                  <ArrowRight className="ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
