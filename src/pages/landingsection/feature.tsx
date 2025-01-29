"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react";

const rows = [
    {
        key: "1",
        name: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
        gold: 2,
        silver: 1,
        bronze: 0,
        sum: 3,
    },
    {
        key: "2",
        name: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
        gold: 2,
        silver: 1,
        bronze: 0,
        sum: 3,
    },
    {
        key: "3",
        name: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
        gold: 2,
        silver: 1,
        bronze: 0,
        sum: 3,
    },
    {
        key: "4",
        name: "รวม",
        gold: 6,
        silver: 3,
        bronze: 0,
        sum: 9,
    }
];

const columns = [
    {
        key: "name",
        label: "สถาบัน",
    },
    {
        key: "gold",
        label: "G",
    },
    {
        key: "silver",
        label: "S",
    },
    {
        key: "bronze",
        label: "B",
    },
    {
        key: "sum",
        label: "รวม",
    },
];
const FeatureSection = () => {
    return (
        <div className="py-16 px-32 flex flex-row justify-between items-center bg-secondw gap-10">
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold text-4xl leading-[64px]">สรุปเหรียญรางวัล</h1>
                    <Button onPress={() => null} className='bg-secondw text-firsto rounded-md text-medium border-firsto border-1 px-10'>กำหนดการ</Button>
                </div>
                <Table isStriped aria-label="table with dynamic content">
                    <TableHeader columns={columns} className="bg-firsto">
                        {(column) => <TableColumn className="bg-firsto text-secondw font-thin text-lg" key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key} className="border-t-2">
                                {(columnKey) => <TableCell className=" text-secondb font-thin text-lg">{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            <div className="w-full flex flex-col gap-5">
                <h1 className="font-bold text-4xl leading-[64px]">สรุปเหรียญรางวัล</h1>
                <Table aria-label="table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}

export default FeatureSection;
