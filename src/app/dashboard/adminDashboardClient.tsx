'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Chip } from '@heroui/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@heroui/react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AdminDashboardClient({
  data,
}: {
  data: {
    matches: Record<
      string,
      { id: number; time: string; sport: string; type: string; homeTeam: string; awayTeam: string; venue: string }[]
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
    return Object.keys(data.matches).sort();
  }, []);

  const matches = data.matches[selectedDate] || [];

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
          <Table>
            <TableHeader>
              <TableColumn className="text-2xl">เวลา</TableColumn>
              <TableColumn className="text-2xl">ประเภทกีฬา</TableColumn>
              <TableColumn className="text-2xl">ทีมA</TableColumn>
              <TableColumn className="text-2xl">ทีมB</TableColumn>
              <TableColumn className="text-2xl">สนาม</TableColumn>
              <TableColumn className="text-2xl">ผลการแข่งขัน</TableColumn>
              <TableColumn className="text-2xl text-end">รายละเอียด</TableColumn>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="text-2xl">{match.time}</TableCell>
                  <TableCell className="text-2xl space-x-2">
                    <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-xl">
                      {match.sport}
                    </Chip>
                    <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-xl">
                      {match.type}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-2xl">{match.homeTeam}</TableCell>
                  <TableCell className="text-2xl">{match.awayTeam}</TableCell>
                  <TableCell className="text-2xl">{match.venue}</TableCell>
                  <TableCell className="text-2xl">-</TableCell>
                  <TableCell className="text-2xl text-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="lg" className="text-xl">
                          ดูรายละเอียด
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl">
                        <DialogHeader>
                          <DialogTitle className="text-5xl">Match Details</DialogTitle>
                          <DialogDescription className="text-3xl">
                            {match.homeTeam} vs {match.awayTeam} - {format(parseISO(selectedDate), 'PPP')} at{' '}
                            {match.time}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 text-2xl">
                          <Card>
                            <CardHeader>{match.homeTeam}</CardHeader>
                            <CardBody>
                              <Table>
                                <TableHeader>
                                  <TableColumn className="text-2xl">Player</TableColumn>
                                  <TableColumn className="text-2xl">Status</TableColumn>
                                </TableHeader>
                                <TableBody>
                                  {data.players[match.id]?.homeTeam.map((player) => (
                                    <TableRow key={player.id}>
                                      <TableCell className="text-2xl">{player.name}</TableCell>
                                      <TableCell className="text-2xl">
                                        {player.registered ? (
                                          <Chip className="bg-green-500 text-xl text-secondw">ลงทะเบียนแล้ว</Chip>
                                        ) : (
                                          <Chip variant="bordered" className="text-red-500 text-xl">
                                            ยังไม่ลงทะเบียน
                                          </Chip>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardBody>
                          </Card>
                          <Card>
                            <CardHeader>{match.awayTeam}</CardHeader>
                            <CardBody>
                              <Table>
                                <TableHeader>
                                  <TableColumn className="text-2xl">Player</TableColumn>
                                  <TableColumn className="text-2xl">Status</TableColumn>
                                </TableHeader>
                                <TableBody>
                                  {data.players[match.id]?.awayTeam.map((player) => (
                                    <TableRow key={player.id}>
                                      <TableCell className="text-2xl">{player.name}</TableCell>
                                      <TableCell className="text-2xl">
                                        {player.registered ? (
                                          <Chip className="bg-green-500 text-xl text-secondw">ลงทะเบียนแล้ว</Chip>
                                        ) : (
                                          <Chip variant="bordered" className="text-red-500 text-xl">
                                            ยังไม่ลงทะเบียน
                                          </Chip>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardBody>
                          </Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Card>
            <CardBody className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No matches scheduled for this date.</p>
            </CardBody>
          </Card>
        )}
      </main>
    </div>
  );
}
