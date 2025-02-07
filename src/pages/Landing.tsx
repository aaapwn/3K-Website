'use client';
import { Session } from 'next-auth';

import HeroSection from '@/pages/landingsection/hero';
import SportSection from './landingsection/sportlist';
import Banner from './landingsection/banner';
import FeatureSection from './landingsection/feature';
import { motion } from 'framer-motion';

type LandingProps = Readonly<{
  session: Session | null;
}>;

const Landing = ({ session }: LandingProps) => {
  return (
    <div className="bg-secondw">
      <HeroSection session={session} />
      <Banner />
      <FeatureSection />
      <Banner />
      <motion.div whileInView={{ opacity: 1 }}>
        <SportSection />
      </motion.div>
    </div>
  );
};

export default Landing;
