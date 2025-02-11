'use client';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Chip } from '@heroui/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import MatchesDetail from '@/components/matchesDetail';
import { Schedule } from '@/queries/schedule/type';

interface match {
  id: number;
  date: string;
  time: string;
  sport: string;
  type: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
}

interface data {
  players: Record<
    number,
    {
      homeTeam: { id: number; name: string; registered: boolean }[];
      awayTeam: { id: number; name: string; registered: boolean }[];
    }
  >;
}

interface MatchesTableProps {
  data: Schedule[];
}

export default function MatchesTable({ data }: MatchesTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn className="text-2xl">วันที่</TableColumn>
          <TableColumn className="text-2xl">เวลา</TableColumn>
          <TableColumn className="text-2xl">ประเภทกีฬา</TableColumn>
          <TableColumn className="text-2xl">สนาม</TableColumn>
          <TableColumn className="text-2xl">ผลการแข่งขัน</TableColumn>
          <TableColumn className="text-2xl text-end">รายละเอียด</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((match) => (
            <TableRow key={match.id}>
              <TableCell className="text-2xl">{format(match.startDatetime, 'dd MMM y')}</TableCell>
              <TableCell className="text-2xl">{match.startDatetime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</TableCell>
              <TableCell className="text-2xl space-x-2">
                <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-xl">
                  {match.sport.category}
                </Chip>
                <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-xl">
                  {match.sport.name}
                </Chip>
              </TableCell>
              <TableCell className="text-2xl">{match.location}</TableCell>
              <TableCell className="text-2xl">-</TableCell>
              <TableCell className="text-2xl text-end">
                <MatchesDetail players={match.players} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
