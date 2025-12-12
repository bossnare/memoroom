import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './Routes';

function App() {
  console.log(import.meta.env.VITE_API_URL);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
