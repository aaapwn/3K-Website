'use client';
import React from 'react';
import { Chip } from '@heroui/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import MatchesDetail from '@/components/matchesDetail';
import { Schedule } from '@/queries/schedule/type';
import { format } from 'date-fns';
import MatchesResultForm from './matchesResultForm';

interface DisplayOption {
  date: boolean;
  time: boolean;
  sport: boolean;
  location: boolean;
  team: boolean;
  result: boolean;
  players: boolean;
  editable: boolean;
}

const defaultDisplayOption: DisplayOption = {
  date: true,
  time: true,
  sport: true,
  location: true,
  team: true,
  result: true,
  players: true,
  editable: false,
};

interface MatchesTableProps {
  data: Schedule[];
  option?: Partial<DisplayOption>;
}

const column = [
  { key: 'date', label: 'วันที่' },
  { key: 'time', label: 'เวลา' },
  { key: 'sport', label: 'กีฬา' },
  { key: 'location', label: 'สถานที่' },
  { key: 'team', label: 'ทีม' },
  { key: 'result', label: 'ผลการแข่งขัน' },
  { key: 'players', label: 'รายชื่อผู้เข้าแข่งขัน' },
  { key: 'editable', label: 'แก้ไขผลการแข่งขัน' },
];

export default function MatchesTable({ data, option }: MatchesTableProps) {
  const displayColumn = column.filter(
    (col) => option?.[col.key as keyof DisplayOption] ?? defaultDisplayOption[col.key as keyof DisplayOption]
  );

  const getDisplayRow = (match: Schedule) => {
    return displayColumn.map((key) => {
      switch (key.key) {
        case 'date':
          return format(match.startDatetime, 'dd/MM/yyyy');
        case 'time':
          return `${match.startDatetime.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
          })} - ${match.endDatetime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`;
        case 'sport':
          return (
            <div className="flex gap-x-1">
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
          // return match.result ? match.result : '-';
          // return match.result ? JSON.stringify(match.result) : '-';
          return match.sport.category === 'กรีฑา'
            ? 'เดี๋ยวมาบอก รอแปป'
            : match.result['data'].scoreA + ' - ' + match.result['data'].scoreB;
        // return match.result.scoreA + ' - ' + match.result.scoreB;
        case 'players':
          return <MatchesDetail players={match.players} />;
        case 'editable':
          return <MatchesResultForm match={match} />;
        default:
          return null;
      }
    });
  };
  return (
    <>
      <Table className="w-full">
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
                <TableCell key={i} className="text-xl">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
