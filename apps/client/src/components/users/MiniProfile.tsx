import { useAuth } from '@/hooks/use-auth';
import { UserAvatar } from './UserAvatar';

export const MiniProfile = ({ btnAction }: { btnAction?: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3 mb-4">
      <UserAvatar user={user} />
      <div className="flex flex-col -space-y-1 overflow-hidden grow">
        <span className="text-lg font-bold tracking-tight truncate md:text-base line-clamp-1">
          {user?.user_metadata.name.split(' (')[0] || 'User Memoroom'}
        </span>
        <span className="text-sm text-muted-foreground">
          {user?.user_metadata.email_verified && 'Account verified'}
        </span>
      </div>
      <div className="ml-auto shrink-0">{btnAction}</div>
    </div>
  );
};
