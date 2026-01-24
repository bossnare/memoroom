import { LoadingCard, LoginCard } from '@/public-site/components/Card';
import { Header } from '@/public-site/components/navigation/Header';
import { MobileMenu } from '@/public-site/components/navigation/MobileMenu';
import { Footer } from '@/shared/components/brand/Footer';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { useToggle } from '@/shared/hooks/use-toggle';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  const {
    value: isPending,
    setTrue: setIsPending,
    setFalse: setIsPendingFalse,
  } = useToggle();

  const { isOpen: isLoginOpen, close: closeLogin } = useQueryToggle({
    key: 'auth',
    value: 'login',
  });
  const { isOpen: isMobileMenuOpen, close: closeMobileMenu } = useQueryToggle({
    key: 'menu',
    value: 'mobile',
  });

  return (
    <div className="relative h-screen">
      <LoadingCard open={isPending} />
      <LoginCard
        setIsPendingFalse={setIsPendingFalse}
        setIsPending={setIsPending}
        open={isLoginOpen}
        close={closeLogin}
      />
      {/* header */}
      <Header />
      {/* Menu content - mobile */}
      <MobileMenu open={isMobileMenuOpen} close={closeMobileMenu} />
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
