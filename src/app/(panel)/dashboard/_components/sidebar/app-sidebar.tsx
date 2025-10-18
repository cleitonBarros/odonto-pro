'use client';

import type * as React from 'react';

import { NavDocuments } from './nav-documents';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { FaTooth } from 'react-icons/fa';
import Link from 'next/link';
import { CalendarHeart, FolderArchive, Landmark, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Agendamento',
      url: '/dashboard',
      icon: <CalendarHeart />,
    },
    {
      title: 'Serviços',
      url: '/dashboard/services',
      icon: <FolderArchive />,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: <Settings />,
    },
  ],
  documents: [
    {
      name: 'Planos',
      url: '/dashboard/plans',
      icon: <Landmark />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5" tooltip={"Home"}>
              <Link href="/" className=''>
                <FaTooth className='w-2'/>
                <p  className="text-sm font-bold">
                  Odonto <span className="text-emerald-600">PRO</span>
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathName={pathName} />
        <NavDocuments items={data.documents} pathName={pathName} />
        <NavSecondary items={data.navSecondary} className="mt-auto" pathName={pathName} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
