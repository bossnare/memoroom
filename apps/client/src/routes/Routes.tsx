import { Login } from '@/components/auth/Login';
import Overview from '@/components/dashboard/Overview';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/use-auth';

export const AppRoutes = () => {
  const { pending, session } = useAuth();

  return (
    <>
      {pending ? (
        // is pending auth
        <div className="inset-0 flex items-center justify-center px-4 min-h-dvh z-100">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <span className="rounded-full size-8 md:size-6 border-3 border-foreground border-t-muted animate-spin"></span>
            <span className="text-lg font-semibold tracking-tighter">
              Authentication...
            </span>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={<ProtectedRoutes pending={pending} session={session} />}
          >
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="search" element={<div>Search Route</div>} />
              <Route
                path="notification"
                element={<div>Notifications Route</div>}
              />
              <Route path="tags" element={<div>Tags Route</div>} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
