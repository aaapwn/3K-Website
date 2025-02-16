'use client';
import React from 'react';
import { Chip } from '@heroui/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import MatchesDetail from '@/components/matchesDetail';
import { Schedule } from '@/queries/schedule/type';
import { format } from 'date-fns';
import TrackingModalResult from './trackingResultModal';

interface DisplayOption {
  date: boolean;
  time: boolean;
  sport: boolean;
  location: boolean;
  team: boolean;
  result: boolean;
  players: boolean;
}

const defaultDisplayOption: DisplayOption = {
  date: true,
  time: true,
  sport: true,
  location: true,
  team: true,
  result: true,
  players: true,
};

interface MatchesTableProps {
  data: Schedule[];
  option?: Partial<DisplayOption>;
  playerStatus?: boolean;
}

const column = [
  { key: 'date', label: 'วันที่' },
  { key: 'time', label: 'เวลา' },
  { key: 'sport', label: 'กีฬา' },
  { key: 'location', label: 'สถานที่' },
  { key: 'team', label: 'ทีม' },
  { key: 'result', label: 'ผลการแข่งขัน' },
  { key: 'players', label: 'รายชื่อผู้เข้าแข่งขัน' },
]

export default function MatchesTable({ data, option, playerStatus = true }: MatchesTableProps) {
  const displayColumn = column.filter((col) => option?.[col.key as keyof DisplayOption] ?? defaultDisplayOption[col.key as keyof DisplayOption]);

  const getDisplayRow = (match: Schedule) => {
    return displayColumn.map((key) => {
      switch (key.key) {
        case 'date':
          return format(match.startDatetime, 'dd/MM/yyyy');
        case 'time':
          return `${match.startDatetime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} - ${match.endDatetime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`;
        case 'sport':
          return (
            <div className='flex gap-x-1'>
              <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-lg">
                {match.sport.category}
              </Chip>
              <Chip variant="bordered" className="bg-firsto/10 text-firsto border-firsto text-lg">
                {match.sport.name}
              </Chip>
            </div>
          );
        case 'location':
          return match.location;
        case 'team':
          return Array.from(new Set(match.players.map((player) => player.user.college))).join(' VS ');
        case 'result':
          return match.result?.type === 'Track' ? <TrackingModalResult data={match.result.data} /> : !match.result ? '-' : <p className='text-green-600 font-bold'>{`${match.result?.data.teamA} ${match.result?.data.scoreA} - ${match.result?.data.scoreB} ${match.result?.data.teamB}`}</p>;
        case 'players':
          return <MatchesDetail players={match.players} option={{status: playerStatus}} />;
        default:
          return null;
      }
    });
  }
  return (
    <>
      <Table>
        <TableHeader>
          {displayColumn.map((key) => (
            <TableColumn key={key.key} className="text-2xl">
              {key.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'ไม่มีการแข่งที่กำลังจะมาถึง'}>
          {data.map((match) => (
            <TableRow key={match.id}>
              {getDisplayRow(match).map((cell, i) => (
                <TableCell key={i} className='text-xl'>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
