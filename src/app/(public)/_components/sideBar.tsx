'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import NavLinks from './navLinks';
import React from 'react';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" className="text-black hover:bg-transparent focus:ring-0">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="z-999 w-60 sm:w-75 px-3">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Veja nossos links</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col space-y-4">
          <NavLinks onClick={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
