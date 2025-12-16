import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';

export const PublicLayout = ({ session }: { session: Session | null }) => {
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
