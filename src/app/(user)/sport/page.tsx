import React from 'react';
import data from '@public/mock.json';
import SportPage from '@/views/sportPage';

async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
}

const Page = async () => {
    const sportData = (await getData()).sports;
    return (
        <div className="min-h-screen pb-10">
            <div className="w-full flex flex-row justify-between items-center relative p-10 bg-firsto">
                <p className='text-6xl font-bold text-secondw'>รายการกีฬา</p>
            </div>
            <SportPage sportData={sportData} />
        </div>
    );
};

export default Page;
