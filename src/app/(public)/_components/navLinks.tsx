import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function NavLinks({ ...rest }) {
  const navItems = [{ href: '#profissionais', label: 'Profissionais' }];
  const session = null;

  return (
    <>
      {navItems.map(item => (
        <Button
          key={item.href}
          asChild
          className="bg-transparent text-black shadow-none hover:bg-transparent"
          {...rest}
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}
      {session ? (
        <Link href="/dashboard" className="flex items-center justify-center gap-2">
          Acessar clinica
        </Link>
      ) : (
        <Button>
          <LogIn /> Portal da clinica
        </Button>
      )}
    </>
  );
}
