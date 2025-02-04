'use client';

import React from 'react';

import { Session } from 'next-auth';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Matches } from '@/app/players/[id]/page';
import MatchesDetailButton from '@/components/matchesDetailButton';

const matchColumn = [
  {
    key: 'date',
    label: 'วันที่',
  },
  {
    key: 'time',
    label: 'เวลา',
  },
  {
    key: 'type',
    label: 'ประเภท',
  },
  {
    key: 'teamA',
    label: 'ทีม A',
  },
  {
    key: 'vs',
    label: 'VS',
  },
  {
    key: 'teamB',
    label: 'ทีม B',
  },
  {
    key: 'venue',
    label: 'สนาม',
  },
  {
    key: 'winner',
    label: 'ผลการแข่งขัน',
  },
  {
    key: 'detail',
    label: 'รายละเอียด',
  },
];

type MatchesTableProps = {
  matchesData: Matches[];
};

const MatchesTable = ({ matchesData }: MatchesTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderCell = React.useCallback((match: Matches, column: React.Key) => {
    const cellValue = match[column as keyof Matches];

    switch (column) {
      case 'date':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'time':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'type':
        return (
          <TableCell className=" text-secondb font-thin text-2xl">
            <Chip className="bg-firsto/10 text-firsto border-1 border-firsto rounded-full text-medium px-5 py-2">
              {cellValue}
            </Chip>
          </TableCell>
        );
      case 'teamA':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'vs':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'teamB':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'venue':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'winner':
        return <TableCell className=" text-secondb font-thin text-2xl">{cellValue}</TableCell>;
      case 'detail':
        return (
          <TableCell className=" text-secondb font-thin">
            <MatchesDetailButton matchesData={matchesData} />
          </TableCell>
        );
      default:
        return null;
    }
  }, []);
  return (
    <Table isStriped aria-label="table with dynamic content" className="h-full">
      <TableHeader columns={matchColumn} className="bg-firsto">
        {(match) => (
          <TableColumn className="bg-firsto text-secondw font-thin text-2xl" key={match.key}>
            {match.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={matchesData}>
        {(match) => (
          <TableRow key={match.date} className="border-t-2">
            {(column) => <>{renderCell(match, column)}</>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MatchesTable;
