import React from 'react';
import data from '@public/mock.json';
import FootballPage from '@/views/footballPage';

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}

const Page = async () => {
  const footballData = (await getData()).soccer_score;
  return (
    <div className="min-h-screen pb-10">
      <div className="w-full flex flex-row justify-between items-center relative p-10 bg-firsto">
        <p className="text-6xl font-bold text-secondw px-20">ลำดับคะแนนกีฬาฟุตบอล</p>
      </div>
      <FootballPage footballData={footballData} />
    </div>
  );
};

export default Page;
