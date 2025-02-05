'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Chip } from '@heroui/react';
import Image from 'next/image';
import qr from '@public/images/qrpreview.webp';
import logo from '@public/images/logo.webp';

type Player = {
  studentID: string;
  university: string;
  titleThai: string;
  nameThai: string;
  sport: string;
  sportType: string;
};

// for future
// type PlayerCardProps = {
//     session: Session | null;
//     playerID: string;
// }

type PlayerCardProps = {
  playerData: Player | null;
};

const PlayerCard = ({ playerData }: PlayerCardProps) => {
  const { data: session } = useSession() || {};

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 rounded-xl bg-secondw drop-shadow-md align-top">
      {/* if key not match do not show but this time i used session to test if this works */}
      {session?.user?.email?.split('@')[0] === playerData?.studentID ? (
        <Image src={qr} alt="qr" className="w-[520px] object-cover" />
      ) : (
        <Image src={logo} alt="logo" className="w-[520px] object-cover" />
      )}
      <div>
        <h1 className="text-3xl font-bold text-firsto">{playerData?.university || 'University Name'}</h1>
        <h1 className="text-4xl font-bold">
          {playerData?.titleThai || 'Mr.'} {playerData?.nameThai || 'John Doe'}
        </h1>
      </div>
      <div className="flex flex-row gap-1.5 items-center content-center">
        <Chip className="bg-firsto/10 text-firsto border-1 border-firsto rounded-full text-medium px-5 py-2">
          {' '}
          {playerData?.sport || 'Sport'}{' '}
        </Chip>
        <Chip className="bg-firsto/10 text-firsto border-1 border-firsto rounded-full text-medium px-5 py-2">
          {' '}
          {playerData?.sportType || 'Sport Type'}{' '}
        </Chip>
      </div>
    </div>
  );
};

export default PlayerCard;
