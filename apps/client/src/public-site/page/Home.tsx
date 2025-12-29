import { Hero } from '@/public-site/components/Hero';
import { HowItWorks } from '@/public-site/components/HowItWorks';
import { WhyItMatters } from '@/public-site/components/WhyItMatters';
import { UseCase } from '@/public-site/components/UseCase';
import { FooterCTA } from '../components/FooterCTA';

export const Home = () => {
  return (
    <>
      <Hero />
      <WhyItMatters />
      {/* divide */}
      <div className="w-full h-0.5 bg-background dark:bg-black"></div>
      <HowItWorks />
      {/* divide */}
      <div className="w-full h-0.5 bg-background dark:bg-black"></div>
      <UseCase />
      <FooterCTA />
    </>
  );
};
