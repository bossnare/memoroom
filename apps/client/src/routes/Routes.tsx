import { Login } from '@/components/auth/Login';
import Overview from '@/components/dashboard/Overview';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/use-auth';
import { PublicLayout } from './PublicLayout';
import { useIsPublicRoute } from '@/hooks/useIsPublicRoute';
import { HomeScreenLoader } from '@/components/HomeScreenLoader';

export const AppRoutes = () => {
  const { pending, session } = useAuth();
  const isPublicRoute = useIsPublicRoute();

  return (
    <>
      {pending ? (
        // is pending auth
        <HomeScreenLoader raison={isPublicRoute} />
      ) : (
        <Routes>
          {/* public */}
          <Route element={<PublicLayout session={session} />}>
            <Route path="/" element={<Login />} />
          </Route>
          {/* protected */}
          <Route element={<ProtectedRoutes session={session} />}>
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
