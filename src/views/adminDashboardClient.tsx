"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

import { Button } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import { ArrowLeft, CalendarIcon } from "lucide-react";

import MatchesTable from "@/components/matchesTable";

import { Schedule } from "@/queries/schedule/type";
import { getAllSchedule } from '@/queries/schedule/query';

type Props = Readonly<{
  session: Session | null;
}>;

export default function AdminDashboardClient({ session }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [displayMatches, setDisplayMatches] = useState<Schedule[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useQuery<Schedule[]>({
    queryKey: ["getAllSchedule"],
    queryFn: () => getAllSchedule(session?.accessToken as string),
  })

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const availableDates = useMemo(() => {
    if (!data) {
      return [];
    }
    return data
      .map((match) => match.startDatetime)
      .reduce((acc: string[], date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        if (!acc.includes(formattedDate)) {
          acc.push(formattedDate);
        }
        return acc;
      }, []);
  }, [data]);

  useEffect(() => {
    setDisplayMatches(
      data?.filter(
        (match) => format(match.startDatetime, "yyyy-MM-dd") === selectedDate
      ) || []
    );
  }, [data, selectedDate]);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className=" bg-firsto text-secondw p-6 hidden md:block">
        <Link href="/" className="flex items-center mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h2 className="text-xl font-bold mb-4">Select Date</h2>
        <ul className="space-y-2">
          {availableDates.map((date) => (
            <li key={date}>
              <Button
                variant="solid"
                className={
                  selectedDate === date
                    ? "w-full justify-center text-xl bg-secondw"
                    : "w-full justify-center text-xl bg-firsto text-secondw"
                }
                onPress={() => handleDateChange(date)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(parseISO(date), "MMMM d, yyyy")}
              </Button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 w-full relative">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <h2 className="text-2xl font-bold mb-4">
          รายการแข่งวันที่ : {format(parseISO(selectedDate), "MMMM d, yyyy")}
        </h2>
        <Button
          onPress={() => onOpen()}
          className="border-firsto text-xl border-1 rounded-md text-white bg-firsto px-5 py-2 mb-4 md:hidden"
        >
          เลือกวันที่
        </Button>

        {displayMatches.length > 0 ? (
          <MatchesTable data={displayMatches} option={{date: false}} />
        ) : (
          <Card>
            <CardBody className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">ไมมีแข่งจ้า</p>
            </CardBody>
          </Card>
        )}
      </main>

      <Drawer isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1 font-bold text-2xl">
            เลือกวันที่ต้องการ
          </DrawerHeader>
          <DrawerBody>
            <ul className="grid grid-cols-2 pb-8">
              {availableDates.map((date) => (
                <li key={date}>
                  <Button
                    variant="solid"
                    className={
                      selectedDate === date
                        ? "w-full justify-center text-xl bg-firsto text-secondw"
                        : "w-full justify-center text-xl bg-secondw"
                    }
                    onPress={() => handleDateChange(date)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(parseISO(date), "MMMM d, yyyy")}
                  </Button>
                </li>
              ))}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
