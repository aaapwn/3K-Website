'use client';

// import { Button } from '@heroui/button';
import MatchesTable from '@/components/matchesTable';
import { Card, CardBody } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

import { Schedule } from '@/queries/schedule/type';
import { getAllSchedule } from '@/queries/schedule/query';

type Props = Readonly<{
  session: Session | null;
}>;

const UpcomingSection = ({ session }:Props) => {
  const { data } = useQuery<Schedule[]>({
    queryKey: ["getAllSchedule"],
    queryFn: () => getAllSchedule(session?.accessToken as string),
  })

  return (
    <div className="pt-16 px-5 md:px-20 flex flex-col justify-center items-center bg-secondw gap-10">
      <p className="text-6xl font-bold">การแข่งขันที่กำลังจะมาถึง</p>
      {data ? (
        <MatchesTable data={data.filter((schedule) => {
          return new Date(schedule.startDatetime) > new Date();
        }).slice(0, 5)} option={{result: false, players: false}}/>
      ) : (
        <Card>
          <CardBody className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">ไมมีแข่งจ้า</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default UpcomingSection;
