import { NoteEditor } from '@/app/components/users/NoteEditor';
import { useUser } from '@/app/hooks/use-user';
import { AppLayout } from '@/app/layout/AppLayout';
import MiniAppLayout from '@/app/layout/MiniAppLayout';
import { EditNotePage } from '@/app/page/EditNotePage';
import { NewNotePage } from '@/app/page/NewNotePage';
import Notification from '@/app/page/Notification';
import Overview from '@/app/page/Overview';
import { Profile } from '@/app/page/Profile';
import { Search } from '@/app/page/Search';
import { Tag } from '@/app/page/Tag';
import { useTheme, type Theme } from '@/components/theme-provider';
import { PublicLayout } from '@/public-site/layout/PublicLayout';
import { About } from '@/public-site/page/About';
import { Contact } from '@/public-site/page/Contact';
import { Home } from '@/public-site/page/Home';
import { Pricing } from '@/public-site/page/Pricing';
import { HomeScreenLoader } from '@/shared/components/HomeScreenLoader';
import { NotFound } from '@/shared/components/not-found';
import { useAuth } from '@/shared/hooks/use-auth';
import { useIsPublicRoute } from '@/shared/hooks/useIsPublicRoute';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRoutes = () => {
  const { pending, session } = useAuth();
  const isPublicRoute = useIsPublicRoute();

  const { setTheme } = useTheme();
  const { data: userProfiles } = useUser();

  const userTheme = (userProfiles?.themeMode ?? 'dark') as Theme;

  // rosolve theme from user profiles
  useEffect(() => {
    if (pending && !isPublicRoute) setTheme(userTheme);
  }, [setTheme, isPublicRoute, userTheme, pending]);

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
          </Route>
          {/* protected */}
          <Route element={<ProtectedRoutes session={session} />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="search" element={<Search />} />
              <Route path="notification" element={<Notification />} />
              <Route path="tags" element={<Tag />} />
            </Route>

            {/* notes */}
            <Route path="/note" element={<MiniAppLayout />}>
              <Route path=":id" element={<NoteEditor mode="view" />} />
              <Route path="new" element={<NewNotePage />} />
              <Route path=":id/edit" element={<EditNotePage />} />
            </Route>

            {/* profile */}
            <Route path="/:username" element={<MiniAppLayout />}>
              <Route index element={<Profile />} />
            </Route>
          </Route>
          {/* not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
