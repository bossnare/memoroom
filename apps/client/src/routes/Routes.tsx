import DashboardLayout from '@/app/DashboardLayout';
import Overview from '@/app/page/Overview';
import { Login } from '@/public_route/page/Login';
import { HomeScreenLoader } from '@/components/HomeScreenLoader';
import { useAuth } from '@/hooks/use-auth';
import { useIsPublicRoute } from '@/hooks/useIsPublicRoute';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicLayout } from '../public_route/PublicLayout';
import { NotFound } from '@/components/not-found';
import { LandingPage } from '@/public_route/page/Landing';
import { SignUp } from '@/public_route/page/Signup';

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/community" element={<LandingPage />} />
            <Route path="/explore" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            {/* auth - public */}
            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<SignUp />} />
            </Route>
          </Route>
          {/* protected */}
          <Route element={<ProtectedRoutes session={session} />}>
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="search" element={<div>Search Route</div>} />
              <Route
                path="notification"
                element={<div>Notifications Route</div>}
              />
              <Route path="tags" element={<div>Tags Route</div>} />
            </Route>
          </Route>
          {/* bad route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
