'use client';

import React from 'react';

import { SportEvent } from '@/queries/user/type';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

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

  return (
    <div className="flex flex-col gap-5 pb-10 pt-5 px-5 rounded-xl bg-secondw w-full h-full">
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
