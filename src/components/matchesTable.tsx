'use client';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Chip } from '@heroui/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import MatchesDetail from '@/components/matchesDetail';

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
  matches: match[];
  data: data;
}

export default function MatchesTable({ matches, data }: MatchesTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn className="text-2xl">วันที่</TableColumn>
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
              <TableCell className="text-2xl">{format(parseISO(match.date), 'dd MMM y')}</TableCell>
              <TableCell className="text-2xl">{match.time}</TableCell>
              <TableCell className="text-2xl space-x-2">
                <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-xl">
                  {match.sport} {match.type}
                </Chip>
              </TableCell>
              <TableCell className="text-2xl">{match.homeTeam}</TableCell>
              <TableCell className="text-2xl">{match.awayTeam}</TableCell>
              <TableCell className="text-2xl">{match.venue}</TableCell>
              <TableCell className="text-2xl">-</TableCell>
              <TableCell className="text-2xl text-end">
                <MatchesDetail match={match} data={data} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
