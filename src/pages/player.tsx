'use client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, UserRoundCheck } from 'lucide-react';

import PlayerCard from './playersection/playercard';
import PlayerTable from './playersection/playertable';

import { Player } from '@/app/players/[id]/page';

type PlayerProfileProps = Readonly<{
  playerID: string;
  playerData: Player;
}>;

const PlayerPage = ({ playerID, playerData }: PlayerProfileProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#FFC72C]/10 px-5 py-5 flex flex-col gap-10">
      <div className="w-full flex flex-row justify-between items-center">
        <Link
          href="/"
          className="flex flex-row gap-1 w-fit rounded-full bg-white border-1 border-firsto px-5 py-2 text-firsto"
        >
          {' '}
          <ChevronLeft />
          กลับหน้าแรก{' '}
        </Link>
        <Link
          href="/"
          className="flex flex-row w-fit gap-1 rounded-full bg-firsto border-1 border-firsto  px-5 py-2 text-secondw"
        >
          {' '}
          ลงทะเบียน <UserRoundCheck />{' '}
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex xl:flex-row flex-col justify-center gap-5 items-center lg:items-start content-start ">
          <PlayerCard playerData={playerData} />
          <PlayerTable playerID={playerID} />
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerPage;
