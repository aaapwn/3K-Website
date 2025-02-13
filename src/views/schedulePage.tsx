'use client';

import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { Session } from 'next-auth';
import { useQuery } from '@tanstack/react-query';

import { Card, CardBody } from '@heroui/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import MatchesTable from '@/components/matchesTable';

import { getAllSchedule } from '@/queries/schedule/query';
import { Schedule } from '@/queries/schedule/type';

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
  session: Session | null;
};

export default function MatchesSchedulePage({ session }: matchesScheduleProps) {
  const [selectedSport, setSelectedSport] = useState<string>('ฟุตบอล');
  const [displayMatches, setDisplayMatches] = useState<Schedule[]>([]);
  const [sports, setSports] = useState<string[]>([]);
  const handleSportChange = (sport: string) => {
    console.log('Selected sport changed to:', sport);
    setSelectedSport(sport);
  };
  const { data } = useQuery<Schedule[]>({
    queryKey: ["getAllSchedule"],
    queryFn: () => getAllSchedule(session?.accessToken as string),
  });

  useEffect(() => {
    setDisplayMatches(
      data?.filter(
        (match) => match.sport.category === selectedSport
      ) || []
    );

    const sports = data
      ?.map((match) => match.sport)
      .reduce((acc: string[], sport) => {
        if (!acc.includes(sport.category)) {
          acc.push(sport.category);
        }
        return acc;
      }, []);
    setSports(sports || []);
  }, [data, selectedSport]);

  return (
    <div className="min-h-screen bg-white flex w-full lg:flex-row flex-col">
      {/* Sidebar */}
      <aside className="w-64 bg-firsto text-secondw p-6 lg:block hidden">
        <h2 className="text-xl font-bold mb-4">Select Sport</h2>
        <ul className="space-y-2">
          {sports?.map((sport, i) => (
            <li key={i}>
              <Button
                variant="solid"
                className={
                  selectedSport === sport
                    ? 'w-full justify-center text-xl bg-secondw'
                    : 'w-full justify-center text-xl bg-firsto text-secondw'
                }
                onPress={() => handleSportChange(sport)}
              >
                {sport}
                {sport === 'แบดมินตัน' && <BadmintonShuttleIcon />}
                {sport === 'หมากกระดาน' && <Chess02Icon />}
                {sport === 'E-sport' && <GameController03Icon />}
                {sport === 'กรีฑา' && <WorkoutRunIcon />}
                {sport === 'เปตอง' && <BowlingBallIcon />}
                {sport === 'เทเบิลเทนนิส' && <TableTennisBatIcon />}
                {sport === 'บาสเกตบอล' && <BasketballIcon />}
                {sport === 'ฟุตบอล' && <FootballIcon />}
                {sport === 'ฟุตซอล' && <FootballIcon />}
                {sport === 'วอลเลย์บอล' && <VolleyballIcon />}
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
              {sports?.map((sport, i) => (
                <DropdownItem
                  key={sport}
                  className={
                    selectedSport === sport
                      ? 'w-full justify-center text-xl bg-firsto text-secondw'
                      : 'w-full justify-center text-xl bg-secondw'
                  }
                  onPress={() => handleSportChange(sport)}
                >
                  <p className="text-xl">{sport}</p>
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
        {displayMatches.length > 0 ? (
          <MatchesTable data={displayMatches} />
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
