import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { useTheme } from './hooks/use-theme';
import { useIsPublicRoute } from './hooks/useIsPublicRoute';
import { AppRoutes } from './routes/router';

function App() {
  const isPublicRoute = useIsPublicRoute();

  // enable body scroll on public route (landing, login, signup), disable on /app
  useEffect(() => {
    if (isPublicRoute) {
      document.body.classList.remove('overflow-hidden', 'overscroll-none');
      document.body.classList.add('overscroll-contain', 'overflow-x-hidden');
    } else document.body.classList.add('overflow-hidden', 'overscroll-none');
  }, [isPublicRoute]);

  const queryClient = new QueryClient();

  const { theme } = useTheme();
  console.log(theme);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />

      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
