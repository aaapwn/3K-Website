"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";
import SportBadge from "@/components/sport/sportbadge";


const SportSection = () => {
    return (
        <div className="py-24 px-32 flex flex-col justify-between items-center bg-secondy/10 gap-10">
            <h1 className="font-bold text-6xl leading-[64px]">รายการกีฬา</h1>
            <h2 className="text-center text-lg">เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ <br />มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
            <div className="flex gap-10 flex-row">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>ลงทะเบียน</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
            <div className="flex justify-center items-center gap-x-[80px] gap-y-10 align-middle self-stretch flex-wrap px-60">
                <SportBadge sport="football" >ฟุตบอล</SportBadge>
                <SportBadge sport="football" >ฟุตซอล</SportBadge>
                <SportBadge sport="basketball">บาสเกตบอล</SportBadge>
                <SportBadge sport="volleyball">วอลเลย์บอล</SportBadge>
                <SportBadge sport="badminton">แบดมินตัน</SportBadge>
                <SportBadge sport="tableTennis">เทเบิลเทนนิส</SportBadge>
                <SportBadge sport="running">กรีฑา</SportBadge>
                <SportBadge sport="bowling">เปตอง</SportBadge>
                <SportBadge sport="chess">หมากกระดาน</SportBadge>
                <SportBadge sport="gaming">เกมส์</SportBadge>
            </div>
        </div >
    );
}

export default SportSection;
