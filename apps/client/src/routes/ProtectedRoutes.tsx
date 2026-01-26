import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoutes = ({ session }: { session: Session | null }) => {
  if (!session && process.env.NODE_ENV === 'production') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
