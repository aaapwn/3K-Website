'use client';

import React from 'react';

import { Matches } from '@/app/players/[id]/page';
import MatchesTable from '@/components/matchesTable';

const PlayerTable = ({ matchesData }: { matchesData: Matches[] }) => {
  return (
    <div className="flex flex-col gap-5 pb-10 pt-5 px-5 rounded-xl bg-secondw w-full h-full">
      <h1 className="text-6xl font-bold">ตารางแข่ง</h1>
      <MatchesTable matchesData={matchesData} />
    </div>
  );
};

export default PlayerTable;
