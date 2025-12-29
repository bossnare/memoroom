import { useToggle } from '@/hooks/use-toggle';
import { Header } from '@/public-site/components/navigation/Header';
import { MobileMenu } from '@/public-site/components/navigation/MobileMenu';
import { Footer } from '@/shared/components/brand/Footer';
import { LoadingCard, LoginCard } from '@/public-site/components/Card';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  const {
    value: isPending,
    setTrue: setIsPending,
    setFalse: setIsPendingFalse,
  } = useToggle();
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      <LoadingCard open={isPending} />
      <LoginCard
        setIsPendingFalse={setIsPendingFalse}
        setIsPending={setIsPending}
      />
      {/* header */}
      <Header toggleOpenMenu={toggleOpenMenu} />
      {/* Menu content - mobile */}
      <MobileMenu open={openMenu} toggle={toggleOpenMenu} />
      {/* main */}
      <main className="relative min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="px-3 py-6 bg-muted-foreground/10 dark:bg-sidebar">
        <Footer />
      </footer>
    </div>
  );
};
