"use client";

import React from 'react';
import FootballPage from '@/views/footballPage';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const sportOption = [
  {
    th: 'ฟุตบอล',
    en: 'Football',
  },
  {
    th: 'ฟุตซอล',
    en: 'Futsal',
  },
  {
    th: 'วอลเลย์บอล',
    en: 'Volleyball',
  }
]

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSport = searchParams.get('sport') || 'Football';

  const handleSportChange = (sport: { th: string; en: string }) => {
    router.push(`?sport=${sport.en}`);
  };

  useEffect(() => {
    if (!sportOption.find((sport) => sport.en === selectedSport)) {
      router.push("?sport=Football");
    }
  }, [selectedSport, router]);

  return (
    <div className="min-h-screen pb-10">
      <div className="w-full flex flex-row justify-between items-center relative p-10 bg-firsto">
        <p className="text-6xl font-bold text-secondw px-20">ลำดับคะแนนกีฬา</p>
        <Dropdown className="text-2xl">
          <DropdownTrigger className="bg-secondw text-xl">
            <Button variant="bordered">
              {sportOption.find((sport) => sport.en === selectedSport)?.th}
              <ChevronDown />
            </Button>
          </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions text-xl">
              {sportOption.map((sport, i) => (
                <DropdownItem
                  key={i}
                  className={
                    selectedSport === sport.en
                      ? 'w-full justify-center text-xl bg-firsto text-secondw'
                      : 'w-full justify-center text-xl bg-secondw'
                  }
                  onPress={() => handleSportChange(sport)}
                >
                  <p className="text-xl">{sport.th}</p>
                </DropdownItem>
              ))}
            </DropdownMenu>
        </Dropdown>
      </div>
      <FootballPage />
    </div>
  );
};

export default Page;
