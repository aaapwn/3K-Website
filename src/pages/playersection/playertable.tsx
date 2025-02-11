'use client';

import React from 'react';

import { SportEvent } from '@/queries/user/type';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';

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
    key: 'sport',
    label: 'กีฬา',
  },
  {
    key: 'type',
    label: 'ประเภท',
  },
  {
    key: 'venue',
    label: 'สนาม',
  },
];

type PlayerTableProps = {
  sportEvents: SportEvent[];
};

const PlayerTable = ({ sportEvents }: PlayerTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(sportEvents);

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
        <TableBody>
          {
            sportEvents.map((sportEvent, index) => (
                <TableRow key={index} className="border-t-2">
                  <TableCell className=" text-secondb font-thin text-2xl">{sportEvent.startDatetime.toLocaleDateString("th-TH")}</TableCell>
                  <TableCell className=" text-secondb font-thin text-2xl">
                  {`${sportEvent.startDatetime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น. - 
                  ${sportEvent.endDatetime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.`}
                  </TableCell>
                  <TableCell className=" text-secondb font-thin text-2xl">{sportEvent.Sport.category}</TableCell>
                  <TableCell className=" text-secondb font-thin text-2xl">{sportEvent.Sport.name}</TableCell>
                  <TableCell className=" text-secondb font-thin text-2xl">{sportEvent.location}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayerTable;
