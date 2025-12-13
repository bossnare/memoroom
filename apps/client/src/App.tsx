import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './Routes';
import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import { supabase } from './auth-services/clients.service';
import { useNavigate } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);

  // OAuth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen auth change
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    if (session) navigate('/dashboard', { replace: true });
    else navigate('/', { replace: true });

    return () => listener.subscription.unsubscribe();
  }, [navigate, session]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes session={session} />

      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
