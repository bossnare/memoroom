import { useToggle } from '@/hooks/use-toggle';
import { Header } from '@/public-site/components/navigation/Header';
import { MobileMenu } from '@/public-site/components/navigation/MobileMenu';
import { Footer } from '@/shared/components/brand/Footer';
import { LoadingCard, LoginCard } from '@/public-site/components/Card';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export const PublicLayout = () => {
  const navigate = useNavigate();

  const {
    value: isPending,
    setTrue: setIsPending,
    setFalse: setIsPendingFalse,
  } = useToggle();

  const [params] = useSearchParams();
  const auth = params.get('auth');
  const menu = params.get('menu');

  const loginOpen = auth === 'login';
  const mobileMenuOpen = menu === 'mobileMenu';

  return (
    <div className="relative h-screen">
      <LoadingCard open={isPending} />
      <LoginCard
        setIsPendingFalse={setIsPendingFalse}
        setIsPending={setIsPending}
        open={loginOpen}
        close={() => navigate(-1) || navigate('/', { replace: true })}
      />
      {/* header */}
      <Header />
      {/* Menu content - mobile */}
      <MobileMenu
        open={mobileMenuOpen}
        close={() => navigate(-1) || navigate('/', { replace: true })}
      />
      {/* main */}
      <main className="relative min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="px-3 py-6 bg-muted-foreground/10 dark:bg-sidebar/20 border-t border-border/50">
        <Footer />
      </footer>
    </div>
  );
};
