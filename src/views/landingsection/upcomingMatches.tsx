'use client';

// import { Button } from '@heroui/button';
import MatchesTable from '@/components/matchesTable';
import { Card, CardBody } from '@heroui/react';

type UpcomingSectionProps = {
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
};

const UpcomingSection = ({ filteredMatches, players }: UpcomingSectionProps) => {
  const matches = filteredMatches
    ? filteredMatches.filter((match) => new Date(match.date) >= new Date()).slice(0, 5)
    : [];

  return (
    <div className="pt-16 px-5 md:px-20 flex flex-col justify-center items-center bg-secondw gap-10">
      <p className="text-6xl font-bold">การแข่งขันที่กำลังจะมาถึง</p>
      {matches.length > 0 ? (
        <MatchesTable matches={matches} players={players} />
      ) : (
        <Card>
          <CardBody className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">ไมมีแข่งจ้า</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default UpcomingSection;
