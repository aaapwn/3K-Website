'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

import { Card, CardBody } from '@heroui/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

import { ArrowLeft, ChevronDown } from 'lucide-react';
import MatchesTable from '@/components/matchesTable';

import {
  BadmintonShuttleIcon,
  Chess02Icon,
  GameController03Icon,
  WorkoutRunIcon,
  BowlingBallIcon,
  TableTennisBatIcon,
  BasketballIcon,
  FootballIcon,
  VolleyballIcon,
} from '@components/sport/sporticon';
// import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react';

type matchesScheduleProps = {
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
  sports: {
    en: string;
    th: string;
    type: string[];
  }[];
  players: Record<
    number,
    {
      homeTeam: { id: number; name: string; registered: boolean }[];
      awayTeam: { id: number; name: string; registered: boolean }[];
    }
  >;
};

export default function MatchesSchedulePage({ filteredMatches, sports, players }: matchesScheduleProps) {
  const [selectedSport, setSelectedSport] = useState<string>('ฟุตบอล');
  const handleSportChange = (sport: string) => {
    console.log('Selected sport changed to:', sport);
    setSelectedSport(sport);
  };

  const matches = filteredMatches ? filteredMatches.filter((match) => match.sport === selectedSport) : [];

  console.log('all sports:', sports);

  return (
    <div className="min-h-screen bg-white flex w-full lg:flex-row flex-col">
      {/* Sidebar */}
      <aside className="w-64 bg-firsto text-secondw p-6 lg:block hidden">
        <h2 className="text-xl font-bold mb-4">Select Sport</h2>
        <ul className="space-y-2">
          {sports?.map((sport) => (
            <li key={sport.en}>
              <Button
                variant="solid"
                className={
                  selectedSport === sport.th
                    ? 'w-full justify-center text-xl bg-secondw'
                    : 'w-full justify-center text-xl bg-firsto text-secondw'
                }
                onPress={() => handleSportChange(sport.th)}
              >
                {sport.th}
                {sport.en === 'badminton' && <BadmintonShuttleIcon />}
                {sport.en === 'chess' && <Chess02Icon />}
                {sport.en === 'gaming' && <GameController03Icon />}
                {sport.en === 'running' && <WorkoutRunIcon />}
                {sport.en === 'petong' && <BowlingBallIcon />}
                {sport.en === 'tableTennis' && <TableTennisBatIcon />}
                {sport.en === 'basketball' && <BasketballIcon />}
                {sport.en === 'football' && <FootballIcon />}
                {sport.en === 'futsal' && <FootballIcon />}
                {sport.en === 'volleyball' && <VolleyballIcon />}
              </Button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Topbar */}
      <header className="w-full bg-firsto p-6 flex items-center justify-between lg:hidden">
        <h1 className="text-2xl font-bold text-secondw">Matches Schedule</h1>
        <Dropdown className="text-2xl">
          <DropdownTrigger className="bg-secondw text-xl">
            <Button variant="bordered">
              {selectedSport}
              <ChevronDown />
            </Button>
          </DropdownTrigger>
          {sports && sports.length > 0 && (
            <DropdownMenu aria-label="Static Actions text-xl">
              {sports?.map((sport) => (
                <DropdownItem
                  key={sport.en}
                  className={
                    selectedSport === sport.th
                      ? 'w-full justify-center text-xl bg-firsto text-secondw'
                      : 'w-full justify-center text-xl bg-secondw'
                  }
                  onPress={() => handleSportChange(sport.th)}
                >
                  <p className="text-xl">{sport.th}</p>
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">รายการแข่งขัน</h1>

        <h2 className="text-2xl font-bold mb-4">กีฬา : {selectedSport}</h2>
        {matches.length > 0 ? (
          <MatchesTable matches={matches} players={players} isShowresult={true} />
        ) : (
          <Card>
            <CardBody className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">ไมมีแข่งจ้า</p>
            </CardBody>
          </Card>
        )}
      </main>
    </div>
  );
}
