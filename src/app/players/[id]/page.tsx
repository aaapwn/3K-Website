'use server';

import React from 'react';
import { use } from 'react';

import PlayerPage from '@/pages/player';

// assume that these datas came from fetching the database
const playerData: Player = {
  id: '1',
  keyForQR: '3-04-01-01-001',
  studentID: '65070020',
  titleThai: 'นาย',
  nameThai: 'กิตติพัฒน์ เอี่ยมลือนาม',
  titleEnglish: 'Mr.',
  nameEnglish: 'Kittipat Aiemluenam',
  university: 'KMITL',
  sport: 'ฟุตบอล',
  sportType: 'ทีมชาย',
  jerseyNumber: '1',
};

const matchesData: Matches[] = [
  {
    date: '15/03/68',
    time: '10:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามกีฬาในร่ม',
    winner: 'KMUTT',
  },
  {
    date: '16/03/68',
    time: '12:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามกีฬากลางแจ้ง',
    winner: 'KMITL',
  },
  {
    date: '17/03/68',
    time: '14:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามแบดมินตัน',
    winner: 'KMUTT',
  },
  {
    date: '18/03/68',
    time: '16:00',
    type: 'ทีมชาย',
    teamA: 'KMITL',
    vs: 'VS',
    teamB: 'KMUTT',
    venue: 'สนามปิงปอง',
    winner: 'KMITL',
  },
];

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

const PlayerProfile = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);

  return <PlayerPage playerID={resolvedParams.id} playerData={playerData} matchesData={matchesData} />;
};

export default PlayerProfile;
