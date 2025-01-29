'use client';
import React from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import { Button } from "@heroui/button";

type NavProps = Readonly<{ session: Session | null; }>

const Nav = ({ session }: NavProps) => {
    return (
        <nav className="flex justify-between items-center py-2 px-32 bg-secondw text-xl drop-shadow-md sticky top-0 z-50">
            <div>
                <Link href="/">
                    <img src="/images/logo.webp" alt="logo" width={50} />
                </Link>
            </div>
            <div className='flex justify-center items-center gap-10 '>
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
            <div>
                {session ? (
                    <div>
                        <Button onPress={() => signOut()} className='bg-firsto text-secondw rounded-sm text-medium'>ออกจากระบบ</Button>
                    </div>
                ) : (
                    <div>
                        <Button onPress={() => signIn()} className='bg-firsto text-secondw rounded-sm text-medium'>เข้าสู่ระบบ</Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
