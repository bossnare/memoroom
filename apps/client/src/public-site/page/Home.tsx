import { useToggle } from '@/hooks/use-toggle';
import { Hero } from '@/public-site/components/Hero';
import { HowItWorks } from '@/public-site/components/HowItWorks';
import { Header } from '@/public-site/components/navigation/Header';
import { MobileMenu } from '@/public-site/components/navigation/MobileMenu';
import { WhyItMatters } from '@/public-site/components/WhyItMatters';
import { Footer } from '@/shared/components/brand/Footer';
import { LoadingCard, LoginCard } from '../components/Card';
import { UseCase } from '@/public-site/components/UseCase';
import { FooterCTA } from '../components/FooterCTA';

export const LandingPage = () => {
  const {
    value: isPending,
    setTrue: setIsPending,
    setFalse: setIsPendingFalse,
  } = useToggle();
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();
  const {
    value: openLoginCard,
    setTrue: setOpenLoginCard,
    toggle: toggleOpenLoginCard,
  } = useToggle();

  return (
    <div className="relative h-screen">
      <LoadingCard open={isPending} />
      <LoginCard
        setIsPendingFalse={setIsPendingFalse}
        open={openLoginCard}
        setIsPending={setIsPending}
        toggle={toggleOpenLoginCard}
      />
      {/* header */}
      <Header
        toggleOpenMenu={toggleOpenMenu}
        setOpenLoginCard={setOpenLoginCard}
      />
      {/* main */}
      <main className="relative min-h-screen">
        <Hero setOpenLoginCard={setOpenLoginCard} />
        <WhyItMatters />
        {/* divide */}
        <div className="w-full h-0.5 bg-background dark:bg-black"></div>
        <HowItWorks />
        {/* divide */}
        <div className="w-full h-0.5 bg-background dark:bg-black"></div>
        <UseCase />
        <FooterCTA setOpenLoginCard={setOpenLoginCard} />
      </main>

      {/* Menu content - mobile */}
      <MobileMenu open={openMenu} toggleOpen={toggleOpenMenu} />

      {/* Footer */}
      <footer className="px-3 py-6 bg-muted-foreground/10 dark:bg-sidebar">
        <Footer />
      </footer>
    </div>
  );
};
