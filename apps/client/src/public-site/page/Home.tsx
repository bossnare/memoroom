import { useToggle } from '@/hooks/use-toggle';
import { Hero } from '@/public-site/components/Hero';
import { HowItWorks } from '@/public-site/components/HowItWorks';
import { Header } from '@/public-site/components/navigation/Header';
import { MobileMenu } from '@/public-site/components/navigation/MobileMenu';
import { WhyItMatters } from '@/public-site/components/WhyItMatters';
import { Footer } from '@/shared/components/brand/Footer';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      {/* header */}
      <Header toggleOpenMenu={toggleOpenMenu} />
      {/* main */}
      <main className="relative min-h-screen">
        <Hero />
        <WhyItMatters />
        {/* divide */}
        <div className="w-full h-1 bg-background dark:bg-black"></div>
        <HowItWorks />
      </main>

      {/* Menu content - mobile */}
      <MobileMenu open={openMenu} toggleOpen={toggleOpenMenu} />

      {/* Footer */}
      <footer className="px-3 py-4 bg-sidebar">
        <Footer />
      </footer>
    </div>
  );
};
