'use server';

import auth from '@/libs/auth';
import PlayerPage from '@/views/player';

export type Player = {
  id: string;
  keyForQR: string;
  studentID: string;
  titleThai: string;
  nameThai: string;
  titleEnglish: string;
  nameEnglish: string;
  university: string;
  sport: string;
  sportType: string;
  jerseyNumber: string;
};

export type Matches = {
  date: string;
  time: string;
  type: string;
  teamA: string;
  vs: string;
  teamB: string;
  venue: string;
  winner: string;
};

const PlayerProfile = async () => {
  const session = await auth();

  return <PlayerPage session={session} />;
};

export default PlayerProfile;
