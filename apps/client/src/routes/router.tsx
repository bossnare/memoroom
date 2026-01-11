import { NoteEditor } from '@/app/components/users/NoteEditor';
import { useIsPublicRoute } from '@/shared/hooks/useIsPublicRoute';
import { AppLayout } from '@/app/layout/AppLayout';
import MiniAppLayout from '@/app/layout/MiniAppLayout';
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
import Notification from '@/app/page/Notification';
import { useUserProfile } from '@/app/api/user-profiles.api';
import { useTheme, type Theme } from '@/components/theme-provider';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const { pending, session } = useAuth();
  const isPublicRoute = useIsPublicRoute();

  const { setTheme } = useTheme();
  const { data: userProfiles } = useUserProfile();

  localStorage.setItem('user-theme', userProfiles?.themeMode as Theme);
  const userCacheTheme = localStorage.getItem('user-theme');

  const userTheme = (userProfiles?.themeMode ??
    userCacheTheme ??
    'dark') as Theme;

  // rosolve theme from user profiles
  useEffect(() => {
    if (!isPublicRoute) setTheme(userTheme);
  }, [setTheme, isPublicRoute, userTheme]);

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
              <Route
                path="search"
                element={<div className="px-3 pt-8 md:px-6">Search Route</div>}
              />
              <Route path="notification" element={<Notification />} />
              <Route
                path="tags"
                element={<div className="px-3 pt-8 md:px-6">Tags Route</div>}
              />
            </Route>

            {/* notes */}
            <Route path="/note" element={<MiniAppLayout />}>
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
