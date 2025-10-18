import Container from '@/components/container';
import Link from 'next/link';
import NavLinks from './navLinks';
import Sidebar from './sideBar';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-100 bg-white px-6 py-4">
      <Container className="flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          Odonto <span className="text-emerald-500">PRO</span>
        </Link>
        <nav className="hidden items-center space-x-4 md:flex">
          <NavLinks />
        </nav>
        <Sidebar />
      </Container>
    </header>
  );
}
