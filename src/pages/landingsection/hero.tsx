'use client';

import { Session } from 'next-auth';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Chip } from '@heroui/react';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';
import heroImage from '@public/images/logo.webp';
import { signIn } from 'next-auth/react';
//dynamic import cuz i've makes a little change in the warpbg eiei
import { WarpBackground } from '@/components/ui/warp-background';

const HeroSection = ({ session }: { session: Session | null }) => {
  return (
    <WarpBackground
      className="bg-secondy/5 px-5 xl:min-h-svh items-center justify-center align-middle justify-items-center"
      beamSize={2}
      beamDuration={4}
      gridColor="#7B818930"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full mx-auto -my-10 gap-0 md:px-32">
        {/* <div className="md:px-12 flex md:flex-row flex-col justify-between items-center gap-10 max-w-7xl mx-auto my-0"> */}
        <div className="flex flex-col md:gap-5 gap-5 justify-center">
          <Chip className="bg-secondy p-5 text-base md:text-lg">รู้จักกับ 3K Games</Chip>
          <div className="flex-col gap-1">
            <h1 className="font-bold xl:text-9xl md:text-7xl text-6xl text-firsto">
              ฟุตบอลประเพณี
              <br />
              <strong className="text-secondb">ชิงถ้วยพระราชทาน</strong>
            </h1>
            <h1 className="font-bold xl:text-3xl md:text-2xl text-xl text-firsto">
              สมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารี
              <br />
              และกีฬา 3 พระจอมเกล้า ครั้งที่ 16
            </h1>
          </div>
          <h2 className="text-lg md:text-xl text-tertbg">
            ร่วมเป็นส่วนหนึ่งของประเพณีอันทรงเกียรติและการแข่งขันฟุตบอลที่ยิ่งใหญ่ที่สุดของ 3 สถาบัน
          </h2>
          {session ? (
            <div className="flex gap-5 md:flex-row flex-col">
              <Link href="/players">
                <Button onPress={() => {}} className="bg-firsto text-secondw rounded-md text-2xl px-10">
                  ลงทะเบียน
                </Button>
              </Link>
              <Link href="/schedule">
                <Button
                  onPress={() => null}
                  className="bg-secondw w-full text-tertbg rounded-md text-2xl border-tertbg border-1 px-10"
                >
                  กำหนดการ
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex md:gap-5 gap-2 md:flex-row flex-col">
              <Button onPress={() => signIn('google')} className="bg-firsto text-secondw rounded-md text-2xl px-10">
                เข้าสู่ระบบ
              </Button>
              <Link href="/schedule">
                <Button
                  onPress={() => null}
                  className="bg-secondw w-full text-tertbg rounded-md text-2xl border-tertbg border-1 px-10"
                >
                  กำหนดการ
                </Button>
              </Link>
            </div>
          )}
        </div>
        <BlurFade className="w-full flex justify-end">
          <Image src={heroImage} alt="logo" className="object-cover xl:w-full h-full aspect-square" />
        </BlurFade>
      </div>
    </WarpBackground>
  );
};

export default HeroSection;
