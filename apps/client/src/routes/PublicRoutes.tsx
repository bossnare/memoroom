import type { Session } from '@supabase/supabase-js';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = ({ session }: { session: Session | null }) => {
  if (session && process.env.NODE_ENV === 'production') {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};
