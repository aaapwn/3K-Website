'use client';

import React from 'react';

// import { Session } from 'next-auth';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';

// const playerData = {
//   id: '1',
//   keyForQR: '3-04-01-01-001',
//   studentID: '65070020',
//   titleThai: 'นาย',
//   nameThai: 'กิตติพัฒน์ เอี่ยมลือนาม',
//   titleEnglish: 'Mr.',
//   nameEnglish: 'Kittipat Aiemluenam',
//   university: 'KMITL',
//   sport: 'ฟุตบอล',
//   sportType: 'ทีมชาย',
//   jerseyNumber: '1',
// };

type Matches = {
  date: string;
  time: string;
  type: string;
  teamA: string;
  vs: string;
  teamB: string;
  venue: string;
  winner: string;
};

const matchesData: Matches[] = [
  {
    date: '15/03/68',
    time: '10:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามกีฬาในร่ม',
    winner: 'KMUTT',
  },
  {
    date: '16/03/68',
    time: '12:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามกีฬากลางแจ้ง',
    winner: 'KMITL',
  },
  {
    date: '17/03/68',
    time: '14:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามแบดมินตัน',
    winner: 'KMUTT',
  },
  {
    date: '18/03/68',
    time: '16:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามปิงปอง',
    winner: 'KMITL',
  },
];

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

const PlayerTable = () => {
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
            <Button
              onPress={onOpen}
              className="border-tertbg text-xl border-1 rounded-md text-tertbg bg-secondw px-5 py-2"
            >
              รายละเอียด
            </Button>
          </TableCell>
        );
      default:
        return null;
    }
  }, [onOpen]);
  return (
    <div className="flex flex-col gap-5 pb-10 pt-5 px-5 rounded-xl bg-secondw w-full h-full">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-3xl font-normal">รายละเอียดการแข่งขัน</p>
                <p className="text-lg font-normal text-tertbg">วันที่ 15/03/68 เวลา 10:00 น.</p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 text-center items-center justify-items-center">
                  <p className="text-5xl font-bold">KMITL</p>
                  <p className="text-3xl font-normal text-secondw bg-firsto rounded-md w-fit px-5 py-2">99-0</p>
                  <p className="text-5xl font-bold">KMUTT</p>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="text-6xl font-bold">ตารางแข่ง</h1>
      <Table isStriped aria-label="table with dynamic content">
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
    </div>
  );
};

export default PlayerTable;
