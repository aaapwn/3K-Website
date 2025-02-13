import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import Image from 'next/image';
import heroImage from '@public/images/og.png';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '3Kings';

  return new ImageResponse(
    (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#E35205] text-white text-6xl font-bold text-center">
        <div className="mb-10">
          <Image src={heroImage} alt="logo" className="object-cover xl:w-full h-full aspect-square" />
        </div>
        <div className="mb-5">{title}</div>
        <div className="text-3xl italic text-[#FFC72C]">
          ฟุตบอลประเพณีชิงถ้วยพระราชทานสมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารีและกีฬา 3
          พระจอมเกล้า ครั้งที่ 16
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
