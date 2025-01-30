"use client";

import { Button } from "@heroui/button";
import SportBadge from "@/components/sport/sportbadge";

type Sport = {
    en: string;
    th: string;
}

const sports: Sport[] = [
    { en: 'football', th: 'ฟุตบอล' },
    { en: 'petong', th: 'ฟุตซอล' },
    { en: 'basketball', th: 'บาสเกตบอล' },
    { en: 'volleyball', th: 'วอลเลย์บอล' },
    { en: 'badminton', th: 'แบดมินตัน' },
    { en: 'tableTennis', th: 'เทเบิลเทนนิส' },
    { en: 'running', th: 'กรีฑา' },
    { en: 'bowling', th: 'เปตอง' },
    { en: 'chess', th: 'หมากกระดาน' },
    { en: 'gaming', th: 'เกมส์' },
]

const SportSection = () => {
    return (
        <div className="md:py-24 py-10 md:px-32 px-5 flex flex-col justify-between items-center bg-secondy/10 md:gap-10 gap-5">
            <h1 className="font-bold md:text-6xl text-4xl leading-[64px]">รายการกีฬา</h1>
            <h2 className="text-center md:text-xl text-lg">เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ <br />มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
            <div className="md:flex md:gap-10 gap-2 md:flex-row flex-col w-full md:w-auto hidden">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>กีฬาทั้งหมด</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3 xl:grid-cols-5">
            {/* <div className="flex justify-center items-center md:gap-x-[80px] md:gap-y-10 align-middle flex-wrap md:px-20 gap-x-10"> */}
                {
                    sports.map((sport, index) => (
                        <SportBadge key={index} sport={sport.en}>{sport.th}</SportBadge>
                    ))
                }
            </div>
            <div className="md:hidden md:gap-10 gap-2 md:flex-row flex-col w-full md:w-auto flex">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>กีฬาทั้งหมด</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
        </div >
    );
}

export default SportSection;
