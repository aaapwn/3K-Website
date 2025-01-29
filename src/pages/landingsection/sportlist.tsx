"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";


const SportSection = () => {
    return (
        <div className="py-24 px-32 flex flex-col justify-between items-center bg-secondy/10 gap-10">
            <h1 className="font-bold text-6xl leading-[64px]">รายการกีฬา</h1>
            <h2 className="text-center text-lg">เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ <br />มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
            <div className="flex gap-10 flex-row">
                <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-16'>ลงทะเบียน</Button>
                <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-16'>กำหนดการ</Button>
            </div>
            <div className="flex justify-center items-center gap-[100px] align-middle self-stretch flex-wrap">
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
                <img src="/images/logo.webp" alt="logo" width={150} />
            </div>
        </div >
    );
}

export default SportSection;
