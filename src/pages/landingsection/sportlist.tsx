"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";
import SportBadge from "@/components/sport/sportbadge";


const sportOptions: { [key in 'football' | 'petong' | 'basketball' | 'volleyball' | 'badminton' | 'tableTennis' | 'running' | 'bowling' | 'chess' | 'gaming']: string } = {
    football: 'ฟุตบอล',
    petong: 'เปตอง',
    basketball: 'บาสเกตบอล',
    volleyball: 'วอลเลย์บอล',
    badminton: 'แบดมินตัน',
    tableTennis: 'เทเบิลเทนนิส',
    running: 'กรีฑา',
    bowling: 'เปตอง',
    chess: 'หมากกระดาน',
    gaming: 'เกมส์',
}

const SportSection = () => {
    return (
        <div className="md:py-24 py-10 md:px-32 px-5 flex flex-col justify-between items-center bg-secondy/10 md:gap-10 gap-5">
            <h1 className="font-bold md:text-6xl text-4xl leading-[64px]">รายการกีฬา</h1>
            <h2 className="text-center md:text-lg text-sm">เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ <br />มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
            <div className="md:flex md:gap-10 gap-2 md:flex-row flex-col w-full md:w-auto hidden">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>กีฬาทั้งหมด</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
            <div className="flex justify-center items-center md:gap-x-[80px] md:gap-y-10 align-middle flex-wrap md:px-20 gap-x-10">
                {Object.keys(sportOptions).slice(0, window.innerWidth < 768 ? 4 : Object.keys(sportOptions).length).map((key) => (
                    <SportBadge key={key} sport={key as keyof typeof sportOptions}>{sportOptions[key as keyof typeof sportOptions]}</SportBadge>
                ))}
            </div>
            <div className="md:hidden md:gap-10 gap-2 md:flex-row flex-col w-full md:w-auto flex">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>กีฬาทั้งหมด</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
        </div >
    );
}

export default SportSection;
