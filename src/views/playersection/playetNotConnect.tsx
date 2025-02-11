'use client';

import React from 'react';
import { Link } from '@heroui/react';


const PlayerNotConnect = () => {

    return (
        <div className="flex flex-col gap-10 pb-10 pt-5 px-5 rounded-xl bg-secondw w-full h-full text-center justify-center items-center self-center">
            <h1 className="text-9xl font-bold text-firsto">โอ๊ะ!</h1>
            <p className='md:text-3xl text-xl'>
                ดูเหมือนว่าคุณยังไม่ได้เชื่อมโยงข้อมูลของคุณกับระบบฐานข้อมูลของเรา 🎯
                <br />
                เพื่อเริ่มต้นใช้งานโปรไฟล์ของคุณอย่างเต็มประสิทธิภาพ กรุณาสแกน QR Code บนป้ายชื่อของคุณเพื่อเชื่อมโยงข้อมูลทันที!
            </p>
            <Link className='bg-firsto text-2xl font-bold px-10 py-2 rounded-md text-secondw' href='/scan-qr'>
                แสกนQR Code ทันที
            </Link>

        </div>
    );
};

export default PlayerNotConnect;
