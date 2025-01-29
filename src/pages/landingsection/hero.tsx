"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { signIn, signOut } from "next-auth/react";
import { Chip } from "@heroui/react";
import { TextAnimate } from "@/components/ui/text-animate";
// import { WarpBackground } from "@/components/ui/warp-background";

import dynamic from 'next/dynamic';
import { WarpBackgroundProps } from '@/components/ui/warp-background'; // Make sure the path is correct

const WarpBackground = dynamic<WarpBackgroundProps>(() =>
    import('@/components/ui/warp-background')
        .then((mod) => mod.WarpBackground) // Access named export
);

const HeroSection = ({ session }: { session: Session | null }) => {
    return (
        <WarpBackground className="bg-secondy/5" beamSize={2} beamDuration={4} gridColor="#7B818930">
            <div className=" px-12 flex flex-row justify-between items-center">
                <div className="w-[679px] flex flex-col gap-5">
                    <Chip className="bg-secondy px-5">รู้จักกับ3K Games</Chip>
                    <h1 className="font-bold text-8xl leading-[90px]">กีฬาประเพณี<br /><strong className="text-firsto">3พระจอม ครั้งที่ 16</strong></h1>
                    <h2>เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
                    {session ? (
                        <div className="flex gap-5 flex-row">
                            <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-10'>ลงทะเบียน</Button>
                            <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-10'>กำหนดการ</Button>
                        </div>
                    ) : (
                        <div className="flex gap-5 flex-row">
                            <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-10'>เข้าสู่ระบบ</Button>
                            <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-10'>กำหนดการ</Button>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <img src="/images/heroimage.png" alt="logo" className="rounded-xl" width={700} />
                    </div>
                </div>
            </div>
        </WarpBackground>
    );
}

export default HeroSection;
