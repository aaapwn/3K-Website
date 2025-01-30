"use client";

import { Session } from "next-auth";
import { Button } from "@heroui/button";
import { signIn, signOut } from "next-auth/react"; //don't delete this
import { Chip } from "@heroui/react";
import { Image } from "@heroui/react";
import NextImage from "next/image";

import dynamic from 'next/dynamic';
import { WarpBackgroundProps } from '@/components/ui/warp-background';
//dynamic import cuz i've makes a little change in the warpbg eiei
const WarpBackground = dynamic<WarpBackgroundProps>(() =>
    import('@/components/ui/warp-background')
        .then((mod) => mod.WarpBackground)
);

const HeroSection = ({ session }: { session: Session | null }) => {
    return (
        <WarpBackground className="bg-secondy/5 px-5 py-10" beamSize={2} beamDuration={4} gridColor="#7B818930">
            <div className="md:px-12 flex md:flex-row flex-col justify-between items-center gap-10">
                <div className="md:w-[679px] flex flex-col md:gap-5 gap-8">
                    <Chip className="bg-secondy px-5">รู้จักกับ3K Games</Chip>
                    <h1 className="font-bold md:text-8xl text-5xl md:leading-[90px]">กีฬาประเพณี<br /><strong className="text-firsto">3พระจอม ครั้งที่ 16</strong></h1>
                    <h2 className="md:text-medium text-sm">เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16 </h2>
                    {session ? (
                        <div className="flex gap-5 md:flex-row flex-col">
                            <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-10'>ลงทะเบียน</Button>
                            <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-10'>กำหนดการ</Button>
                        </div>
                    ) : (
                        <div className="flex md:gap-5 gap-2 md:flex-row flex-col">
                            <Button onPress={() => null} className='bg-firsto text-secondw rounded-md text-medium px-10'>เข้าสู่ระบบ</Button>
                            <Button onPress={() => null} className='bg-secondw text-tertbg rounded-md text-medium border-tertbg border-1 px-10'>กำหนดการ</Button>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-auto">
                    <Image src="/images/heroimage.png" isBlurred as={NextImage} alt="logo" layout="responsive" width={700} height={700} className="object-contain" />
                </div>
            </div>
        </WarpBackground>
    );
}

export default HeroSection;
