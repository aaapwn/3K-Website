'use client';
import React from 'react';
import Link from 'next/link';

import { Button } from "@heroui/button";

import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="flex flex-row justify-between items-center py-6 px-32 bg-secondb text-secondw text-xl drop-shadow-md">
            <div className="px-2.5 justify-between items-center">
                <p className='font-medium text-2xl'>สนับสนุนโดย</p>
                <div className='flex flex-row gap-5'>
                    <img src="/images/KMITL.webp" alt="logo" width={70} className="object-contain" />
                    <img src="/images/logo_light.webp" alt="logo" width={70} className="object-contain" />
                </div>
                <Link rel="noopener noreferrer" target="_blank" href={'https://www.placeholderpayments.com/legal/terms-of-service.html'} className='underline font-bold'>Term of servicePrivacy policyCookie policy</Link>
            </div>
            <div className="px-2.5 justify-between items-center">
                <p className='font-medium text-2xl text-end'>ช่องทางการติดต่่อ</p>
                <div className='flex flex-row gap-5 justify-end'>
                    <Instagram />
                    <Facebook />
                    <Mail />
                </div>
                <p className='font-medium text-medium text-end self-stretch'>
                    สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br />
                    เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520<br />
                    <br />
                    ติดต่อ +66 (0) 1234 56789
                </p>
            </div>
        </footer>
    );
};

export default Footer;
