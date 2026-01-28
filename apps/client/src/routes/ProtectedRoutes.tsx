import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoutes = ({ session }: { session: Session | null }) => {
  if (process.env.NODE_ENV === 'production') {
    if (session) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } else {
    return <Outlet />;
  }
};
