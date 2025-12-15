import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { AppRoutes } from './routes/Routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />

      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
