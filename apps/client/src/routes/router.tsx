import { NoteEditor } from '@/app/components/users/NoteEditor';
import { useIsPublicRoute } from '@/shared/hooks/useIsPublicRoute';
import { AppLayout } from '@/app/layout/AppLayout';
import MiniLayout from '@/app/layout/MiniLayout';
import Overview from '@/app/page/Overview';
import { PublicLayout } from '@/public-site/layout/PublicLayout';
import { About } from '@/public-site/page/About';
import { Contact } from '@/public-site/page/Contact';
import { Home } from '@/public-site/page/Home';
import { Pricing } from '@/public-site/page/Pricing';
import { SignUp } from '@/public-site/page/Signup';
import { HomeScreenLoader } from '@/shared/components/HomeScreenLoader';
import { NotFound } from '@/shared/components/not-found';
import { useAuth } from '@/shared/hooks/use-auth';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

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
          <Route element={<PublicRoutes session={session} />}>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            {/* auth - public */}
            <Route path="/auth">
              <Route path="register" element={<SignUp />} />
            </Route>
          </Route>
          {/* protected */}
          <Route element={<ProtectedRoutes session={session} />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="search" element={<div>Search Route</div>} />
              <Route
                path="notification"
                element={<div className="text-center py-4">Notification</div>}
              />
              <Route path="tags" element={<div>Tags Route</div>} />
            </Route>

            {/* notes */}
            <Route path="/note" element={<MiniLayout />}>
              <Route path="new" element={<NoteEditor />} />
            </Route>
          </Route>
          {/* not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
