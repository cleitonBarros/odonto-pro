import type { PropsWithChildren } from 'react';
import { AppSidebar } from './_components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TopBar } from './_components/topbar';

export default function LayoutRoot({ children }: PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className='bg-gray-100 p-4  '>
        <TopBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
