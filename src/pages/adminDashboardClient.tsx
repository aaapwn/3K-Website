'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

import { Card, CardBody } from '@heroui/react';

import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import MatchesTable from '@/components/matchesTable';
// import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react';

export default function AdminDashboardClient({
  data,
}: {
  data: {
    matches: Record<
      string,
      {
        id: number;
        date: string;
        time: string;
        sport: string;
        type: string;
        homeTeam: string;
        awayTeam: string;
        venue: string;
      }[]
    >;
    players: Record<
      number,
      {
        homeTeam: { id: number; name: string; registered: boolean }[];
        awayTeam: { id: number; name: string; registered: boolean }[];
      }
    >;
  };
}) {
  const [selectedDate, setSelectedDate] = useState<string>('2024-06-15');
  const handleDateChange = (date: string) => {
    console.log('Selected date changed to:', date);
    setSelectedDate(date);
  };

  const availableDates = useMemo(() => {
    return data && data.matches ? Object.keys(data.matches).sort() : [];
  }, [data]);

  const matches = data && data.matches ? data.matches[selectedDate] || [] : [];

  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl">This dashboard is not available on mobile devices.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-firsto text-secondw p-6">
        <Link href="/" className="flex items-center mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h2 className="text-xl font-bold mb-4">Select Date</h2>
        <ul className="space-y-2">
          {availableDates.map((date) => (
            <li key={date}>
              <Button
                variant="solid"
                className={
                  selectedDate === date
                    ? 'w-full justify-center text-xl bg-secondw'
                    : 'w-full justify-center text-xl bg-firsto text-secondw'
                }
                onPress={() => handleDateChange(date)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(parseISO(date), 'MMMM d, yyyy')}
              </Button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <h2 className="text-2xl font-bold mb-4">รายการแข่งวันที่ : {format(parseISO(selectedDate), 'MMMM d, yyyy')}</h2>
        {matches.length > 0 ? (
          <MatchesTable matches={matches} players={data.players} />
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
