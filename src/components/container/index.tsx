import React from 'react';
import { cn } from '../../lib/utils';

interface WrapperProps {
  as?: React.ElementType;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<WrapperProps> = React.memo(({ as: Tag = 'div', className, children }) => {
  return <Tag className={cn('container mx-auto w-full', className)}>{children}</Tag>;
});

Container.displayName = 'Container';
export default Container;
