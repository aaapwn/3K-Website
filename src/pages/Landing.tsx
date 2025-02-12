'use client';
import { Session } from 'next-auth';

import HeroSection from '@/pages/landingsection/hero';
import SportSection from './landingsection/sportlist';
import Banner from './landingsection/banner';
import FeatureSection from './landingsection/feature';
import { motion } from 'framer-motion';
import UpcomingSection from '@/pages/landingsection/upcomingMatches';

type LandingProps = Readonly<{
  session: Session | null;
  filteredMatches: {
    id: number;
    date: string;
    time: string;
    sport: string;
    type: string;
    homeTeam: string;
    awayTeam: string;
    venue: string;
  }[];
  players: Record<
    number,
    {
      homeTeam: { id: number; name: string; registered: boolean }[];
      awayTeam: { id: number; name: string; registered: boolean }[];
    }
  >;
}>;

const Landing = ({ session, filteredMatches, players }: LandingProps) => {
  return (
    <div className="bg-secondw">
      <HeroSection session={session} />
      <Banner />
      <UpcomingSection filteredMatches={filteredMatches} players={players} />
      <FeatureSection />
      <Banner />
      <motion.div whileInView={{ opacity: 1 }}>
        <SportSection />
      </motion.div>
    </div>
  );
};

export default Landing;
