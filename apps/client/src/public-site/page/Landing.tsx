import { useToggle } from '@/hooks/use-toggle';
import { LandingPageMenu } from '@/public-site/components/navigation/LandingPageMenu';
import { Footer } from '@/shared/components/brand/Footer';
import { Header } from '@/public-site/components/navigation/Header';
import { Hero } from '@/public-site/components/Hero';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      {/* header */}
      <Header toggleOpenMenu={toggleOpenMenu} />
      {/* main */}
      <main className="relative min-h-screen">
        <Hero />

        <section className="pt-14 h-dvh">
          <h2 className="text-3xl font-bold tracking-tight text-center scroll-m-20 text-balance">
            Features
          </h2>
        </section>
      </main>

      {/* Menu content - mobile */}
      <LandingPageMenu open={openMenu} toggleOpen={toggleOpenMenu} />

      {/* Footer */}
      <footer className="px-3 py-4">
        <Footer />
      </footer>
    </div>
  );
};
