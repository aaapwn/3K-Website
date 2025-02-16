import React from 'react';
import FootballPage from '@/views/footballPage';

const Page = async () => {
  return (
    <div className="min-h-screen pb-10">
      <div className="w-full flex flex-row justify-between items-center relative p-10 bg-firsto">
        <p className="text-6xl font-bold text-secondw px-20">ลำดับคะแนนกีฬาฟุตบอล</p>
      </div>
      <FootballPage />
    </div>
  );
};

export default Page;
