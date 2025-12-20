import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@supabase/supabase-js';
import { getInitials } from '@/utils/get-name.strings';

export const UserAvatar = ({
  user,
  fallback,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  fallback?: string;
  user?: User | null;
}) => {
  const username = getInitials(user?.user_metadata.name.split('(')[0]);

  return (
    <Avatar {...props} className={cn('size-10 shrink-0', className)}>
      <AvatarImage
        loading="lazy"
        alt="user_avatar"
        src={user?.user_metadata.avatar_url}
      ></AvatarImage>
      <AvatarFallback className="font-bold">
        {fallback || username}
      </AvatarFallback>
    </Avatar>
  );
};
