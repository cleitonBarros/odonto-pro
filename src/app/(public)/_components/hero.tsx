import Container from '@/components/container';
import doctorImg from '../../../../public/doctorHero.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-white">
      <Container as="section" className="px-4 pt-20 pb-4 sm:px-6 sm:pb-0 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex max-w-3xl flex-2 flex-col justify-center space-y-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight lg:text-5xl">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Nós somos uma plataforma para profissionais da saúde com foco em agilizar seu
              atendimento de forma simplificada e organizada.
            </p>
            <Button className="w-fit bg-emerald-500 px-6 font-semibold hover:bg-emerald-400">
              Encontre uma clinica
            </Button>
          </article>
          <div className="hidden lg:block">
            <Image
              src={doctorImg}
              alt="Foto ilustrativa de um profissional de saude"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </Container>
    </div>
  );
}
