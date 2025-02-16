"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

import { getMedalSummary } from "@/queries/result/qurey";
import { MedalSummary } from "@/queries/result/type";

const columns = [
  {
    key: "college",
    label: "สถาบัน/มหาวิทยาลัย",
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
    key: "total",
    label: "รวม",
  },
];
const FeatureSection = () => {
  const { data } = useQuery<MedalSummary>({
    queryKey: ["medal-summary"],
    queryFn: getMedalSummary,
  });

  return (
    <div className="pb-16 px-5 md:px-20 flex md:flex-row flex-col justify-between items-stretch bg-secondw gap-10">
      <div className="w-full flex flex-col gap-5">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <h1 className="font-bold lg:text-5xl text-4xl leading-[64px]">
            สรุปเหรียญรางวัล
          </h1>
          <Link href={"/football"}>
            <Button className="bg-secondw text-firsto rounded-md text-xl border-firsto border-1 px-10">
              สำหรับฟุตบอล <strong>Click</strong>
            </Button>
          </Link>
        </div>
        <Table isStriped aria-label="table with dynamic content">
          <TableHeader columns={columns} className="bg-firsto">
            {(column) => (
              <TableColumn
                className="bg-firsto text-secondw font-thin text-2xl"
                key={column.key}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"ไม่พบข้อมูล"}>
            <>
              {data
                ? data.medals.map((college, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="text-secondb font-thin text-2xl">
                          {college.college?.toString() || "N/A"}
                        </TableCell>
                        <TableCell className="text-secondb font-thin text-2xl">{college.gold || 0}</TableCell>
                        <TableCell className="text-secondb font-thin text-2xl">{college.silver || 0}</TableCell>
                        <TableCell className="text-secondb font-thin text-2xl">{college.bronze || 0}</TableCell>
                        <TableCell className="text-secondb font-thin text-2xl">{college.total || 0}</TableCell>
                      </TableRow>
                    );
                  })
                : []}
              <TableRow>
                <TableCell className="text-secondb font-thin text-2xl">รวม</TableCell>
                <TableCell className="text-secondb font-thin text-2xl">{getKeyValue(data?.total, "gold")}</TableCell>
                <TableCell className="text-secondb font-thin text-2xl">{getKeyValue(data?.total, "silver")}</TableCell>
                <TableCell className="text-secondb font-thin text-2xl">{getKeyValue(data?.total, "bronze")}</TableCell>
                <TableCell className="text-secondb font-thin text-2xl">{getKeyValue(data?.total, "total")}</TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="font-bold lg:text-5xl text-4xl leading-[64px] md:text-start text-center">
          สนามแข่งขัน
        </h1>
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
