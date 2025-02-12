'use client';

import { Button } from '@heroui/button';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react';

const rows = [
  {
    key: '1',
    name: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
    gold: 2,
    silver: 1,
    bronze: 0,
    sum: 3,
  },
  {
    key: '2',
    name: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
    gold: 2,
    silver: 1,
    bronze: 0,
    sum: 3,
  },
  {
    key: '3',
    name: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
    gold: 2,
    silver: 1,
    bronze: 0,
    sum: 3,
  },
  {
    key: '4',
    name: 'รวม',
    gold: 6,
    silver: 3,
    bronze: 0,
    sum: 9,
  },
];

const columns = [
  {
    key: 'name',
    label: 'สถาบัน',
  },
  {
    key: 'gold',
    label: 'G',
  },
  {
    key: 'silver',
    label: 'S',
  },
  {
    key: 'bronze',
    label: 'B',
  },
  {
    key: 'sum',
    label: 'รวม',
  },
];
const FeatureSection = () => {
  return (
    <div className="py-16 px-5 md:px-20 flex md:flex-row flex-col justify-between items-stretch bg-secondw gap-10">
      <div className="w-full flex flex-col gap-5">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <h1 className="font-bold lg:text-5xl text-4xl leading-[64px]">สรุปเหรียญรางวัล</h1>
          <Button
            onPress={() => null}
            className="bg-secondw text-firsto rounded-md text-xl border-firsto border-1 px-10"
          >
            สำหรับฟุตบอล <strong>Click</strong>
          </Button>
        </div>
        <Table isStriped aria-label="table with dynamic content">
          <TableHeader columns={columns} className="bg-firsto">
            {(column) => (
              <TableColumn className="bg-firsto text-secondw font-thin text-2xl" key={column.key}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key} className="border-t-2">
                {(columnKey) => (
                  <TableCell className=" text-secondb font-thin text-2xl">{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="font-bold lg:text-5xl text-4xl leading-[64px]">สนามแข่งขัน</h1>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1JorzL06nDG1LWV_XP52JvFHCyp3VIBs&ehbc=2E312F"
          className="min-h-[400px]"
          lang="th"
        ></iframe>
      </div>
    </div>
  );
};

export default FeatureSection;
