import { cn } from '@/app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/app/utils/get-name.strings';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import * as React from 'react';

export const UserAvatar = ({
  user,
  fallback,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  fallback?: string;
  user?: SupabaseUser | null;
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
        {getInitials(fallback) || username || 'U'}
      </AvatarFallback>
    </Avatar>
  );
};
