import Footer from './_components/footer';
import Header from './_components/header';
import Hero from './_components/hero';
import Profissionais from './_components/professionais';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />
        <Profissionais />
        <Footer />
      </div>
    </main>
  );
}
