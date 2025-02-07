'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Chip } from '@heroui/react';
import SportBadge from '@/components/sport/sportbadge';

type sportPageProps = {
  sportData: {
    en: string;
    th: string;
    type: string[];
  }[];
};

export default function SportPage({ sportData }: sportPageProps) {
  return (
    <div className="flex flex-col justify-center lg:px-32 md:px-14 px-10 py-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {sportData.map((sport, index) => (
          <Card className="" key={sport.en}>
            <CardHeader className="flex gap-1 bg-secondy/10 p-5 items-center">
              <SportBadge sport={sport.en} className="scale-50" key={sport.en}></SportBadge>
              <p className="text-3xl font-bold">{sport.th}</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์
                มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16{' '}
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex gap-2 w-full flex-wrap">
              {sport.type.map((type, index) => (
                <Chip key={sport.en + index}>{type}</Chip>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
