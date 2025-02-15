'use client';
import FootballTable from '@/components/footballTable';

type footballPageProps = {
  footballData: {
    key: string;
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  }[];
};

export default function FootballPage({ footballData }: footballPageProps) {
  return (
    <div className="flex flex-col justify-center lg:px-32 md:px-14 px-10 py-10">
      <FootballTable footballData={footballData} />
    </div>
  );
}
