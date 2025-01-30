'use client';
import React from 'react';
import Link from 'next/link';
import { Image } from "@heroui/react";
import NextImage from "next/image";

import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="flex md:flex-row flex-col md:justify-between justify-center md:text-start text-center py-6 px-5 md:px-32 bg-secondb text-secondw md:text-xl text-medium">
            <div className="px-2.5 justify-between">
                <p className='font-medium text-2xl hidden md:block'>สนับสนุนโดย</p>
                <div className='flex flex-row gap-5 justify-center md:justify-start align-middle items-center'>
                    <Image src="/images/KMITL.webp" as={NextImage} alt="logo" width={50} height={50} className="object-contain" />
                    <Image src="/images/logo_light.webp" as={NextImage}  alt="logo" width={50} height={50} className="object-contain" />
                </div>
                <div className="flex-col md:px-2.5 justify-between flex md:hidden gap-5">
                    <div className='flex-col flex gap-5'>
                        <p className='font-medium text-2xl text-center py-5 px-5 border-b-1 border-secondy w-fit self-center'>ช่องทางการติดต่่อ</p>
                        <div className='flex flex-row gap-5 justify-center'>
                            <Link rel="noopener noreferrer" target="_blank" href={'https://www.instagram.com/sor.kmitlofficial/'}>
                                <Instagram />
                            </Link>

                            <Link rel="noopener noreferrer" target="_blank" href={'https://www.facebook.com/sorkmitl/'}>
                                <Facebook />
                            </Link>

                            <Link rel="noopener noreferrer" target="_blank" href={'mailto:sor.kmitl.ac.th'}>
                                <Mail stroke='white' />
                            </Link>
                        </div>
                    </div>
                    <p className='font-medium md:text-lg text-medium text-center self-stretch'>
                        สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br />
                        เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520<br />
                    </p>
                </div>
                <Link rel="noopener noreferrer" target="_blank" href={'https://www.placeholderpayments.com/legal/terms-of-service.html'} className='underline'>
                    Term of servicePrivacy policyCookie policy
                </Link>
            </div>
            <div className="flex-col px-2.5 justify-between hidden md:flex">
                <div className=''>
                    <p className='font-medium text-2xl text-end'>ช่องทางการติดต่่อ</p>
                    <div className='flex flex-row gap-5 justify-end'>

                        <Link rel="noopener noreferrer" target="_blank" href={'https://www.instagram.com/sor.kmitlofficial/'}>
                            <Instagram />
                        </Link>

                        <Link rel="noopener noreferrer" target="_blank" href={'https://www.facebook.com/sorkmitl/'}>
                            <Facebook />
                        </Link>

                        <Link rel="noopener noreferrer" target="_blank" href={'mailto:sor.kmitl.ac.th'}>
                            <Mail stroke='white' />
                        </Link>

                    </div>
                </div>
                <p className='font-medium text-lg text-end self-stretch'>
                    สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br />
                    เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520 <br />
                </p>
            </div>
        </footer>
    );
};

export default Footer;
