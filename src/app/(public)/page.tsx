import Footer from './_components/footer';
import Header from './_components/header';
import Hero from './_components/hero';
import Profissionais from './_components/professionais';
import { getAllClinics } from './_data-access/get-all-clinics';


export const revalidate = 120; 

export default async function Home() {
  const clinics = await getAllClinics();

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />
        <Profissionais clinics={clinics || []} />
        <Footer />
      </div>
    </main>
  );
}
