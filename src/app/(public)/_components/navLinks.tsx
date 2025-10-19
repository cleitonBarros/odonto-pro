'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { handleRegister } from '../_actions/login';

export default function NavLinks({ ...rest }) {
  const { data: session, status } = useSession();
  const navItems = [{ href: '#profissionais', label: 'Profissionais' }];

  const handleLogin = async () => {
    await handleRegister('github');
  };

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
      {status === 'loading' ? (
        <></>
      ) : session ? (
        <Link href="/dashboard" className="flex items-center justify-center gap-2">
          Acessar clinica
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          <LogIn /> Portal da clinica
        </Button>
      )}
    </>
  );
}
