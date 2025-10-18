'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { getPageName } from '../../../../hooks/get-page-name';

export function TopBar() {
  const pathName = usePathname();

  return (
    <div className="flex w-full items-center rounded-xl bg-emerald-600 px-4 py-1 text-white shadow-none">
      <SidebarTrigger className="size-8 cursor-pointer" />
      <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
      <h1 className="text-base font-medium">{getPageName(pathName)}</h1>
    </div>
  );
}
