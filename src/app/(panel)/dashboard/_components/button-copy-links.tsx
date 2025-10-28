'use client';

import { LinkIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';

export function ButtonCopyLinks({ userId }: { userId: string }) {

  const handleClick = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/clinica/${userId}`);
    toast.success('Link copiado para a área de transferência!');
  };

  return (
    <Button size={'icon'} onClick={handleClick}>
      <LinkIcon className="size-5" />
    </Button>
  );
}
