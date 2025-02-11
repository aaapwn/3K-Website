'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Chip } from '@heroui/react';
import { UserProfile } from '@/queries/user/type';
import QRCode from "react-qr-code";

type PlayerCardProps = {
  playerData: UserProfile;
};

const PlayerCard = ({ playerData }: PlayerCardProps) => {
  const sport = playerData.sportEvents?.map((sport) => sport.Sport.name);
  const sportType = playerData.sportEvents?.map((sport) => sport.Sport.category);

  const displaySport = Array.from(new Set([...sportType, ...sport]));

  return (
    <div className="flex flex-col items-center gap-5 px-5 py-10 rounded-xl bg-secondw drop-shadow-md align-top">
      <QRCode value={playerData.qr_key} />
      <div>
        <h1 className="text-3xl font-bold text-firsto">{playerData.college }</h1>
        <h1 className="text-4xl font-bold">
          {`${playerData.prefix_en}${playerData.firstname_en} ${playerData.lastname_en}`}
        </h1>
      </div>
      <div className="flex flex-row gap-1.5 items-center content-center">
        {
          displaySport.map((sport, index) => (
            <Chip className="bg-firsto/10 text-firsto border-1 border-firsto rounded-full text-medium px-5 py-2" key={index}>
              {sport}
            </Chip>
          ))
        }
      </div>
    </div>
  );
};

export default PlayerCard;
