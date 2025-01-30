'use client';
import React from 'react';
import Link from 'next/link';

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import logo from "@public/images/logo.webp"

import { MenuIcon, ChevronRight } from 'lucide-react';

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Button,
    useDisclosure,
} from "@heroui/react";

type NavProps = Readonly<{ session: Session | null; }>

const Nav = ({ session }: NavProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <nav className="flex justify-between items-center py-2 md:px-32 px-5 bg-secondw text-xl drop-shadow-md sticky top-0 z-50">
            <div>
                <Link href="/">
                    <Image src={logo}  alt="logo" width={50} />
                </Link>
            </div>
            <div className='md:flex hidden justify-center items-center gap-10 '>
                <Link href="/">
                    นักกีฬา
                </Link>
                <Link href="/">
                    กำหนดการ
                </Link>
                <Link href="/">
                    กีฬาทั้งหมด
                </Link>
                <Link href="/">
                    กฏระเบียบ/PDPA
                </Link>
            </div>
            <div className='flex-row flex gap-2 items-center'>
                {session ? (
                    <div>
                        <Button onPress={() => signOut()} className='bg-firsto text-secondw rounded-sm text-medium'>ออกจากระบบ</Button>
                    </div>
                ) : (
                    <div>
                        <Button onPress={() => signIn('google')} className='bg-firsto text-secondw rounded-sm text-medium'>เข้าสู่ระบบ</Button>
                    </div>
                )}
                <button onClick={onOpen} className='md:hidden'>
                    <MenuIcon size={30} />
                </button>
                <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} className='md:hidden rounded-none'>
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-row gap-1 items-center text-center justify-center text-xl p-0">
                                    <Button onPress={onClose} className='w-full rounded-none p-8 text-xl bg-tertbg/10' isIconOnly>
                                        Close<ChevronRight />
                                    </Button>
                                </DrawerHeader>
                                <DrawerBody className='flex flex-col justify-center mb-16'>
                                    <Link href="/" className='w-full rounded-none p-4 text-xl text-center'>
                                        นักกีฬา
                                    </Link>
                                    <Link href="/" className='w-full rounded-none p-4 text-xl text-center'>
                                        กำหนดการ
                                    </Link>
                                    <Link href="/" className='w-full rounded-none p-4 text-xl text-center'>
                                        กีฬาทั้งหมด
                                    </Link>
                                    <Link href="/" className='w-full rounded-none p-4 text-xl text-center'>
                                        กฏระเบียบ/PDPA
                                    </Link>
                                </DrawerBody>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </nav>
    );
};

export default Nav;
