import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoutes = ({
  session,
  pending,
}: {
  session: Session | null;
  pending: boolean;
}) => {
  if (!session && !pending) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
