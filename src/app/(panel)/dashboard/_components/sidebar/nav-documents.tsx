/** biome-ignore-all assist/source/organizeImports: <> */
'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Link from 'next/link';

export function NavDocuments({
  items,
  pathName,
}: {
  items: {
    name: string;
    url: string;
    icon: React.JSX.Element;
  }[];
  pathName: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Minha conta</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              className={`hover:bg-emerald-600 hover:text-white ${pathName === item.url ? 'bg-emerald-600 text-white' : ''}`}
            >
              <Link href={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
