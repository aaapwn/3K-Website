'use client';
import React from 'react';
import Link from 'next/link';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import logo from '@public/images/logo.webp';

import { MenuIcon, ChevronRight } from 'lucide-react';

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Button, useDisclosure } from '@heroui/react';

type NavProps = Readonly<{ session: Session | null }>;

const Nav = ({ session }: NavProps) => {
  console.log(session);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <nav className="grid auto-cols-min md:grid-cols-4 grid-cols-2 items-center justify-items-center px-5 bg-secondw text-xl drop-shadow-md sticky top-0 z-50 gap-1">
      <div className="justify-self-start py-4">
        <Link href="/">
          <Image src={logo} alt="logo" width={50} />
        </Link>
      </div>
      <div className="md:flex hidden justify-center w-fit col-span-2 md:text-base lg:text-xl md:justify-self-start lg:justify-self-center h-full items-stretch py-1">
        {/* <Link className=" hover:bg-tertbg/20 flex justify-center items-center px-4 duration-200 rounded-md" href="/">
          นักกีฬา
        </Link>
        <Link className=" hover:bg-tertbg/20 flex justify-center items-center px-4 duration-200 rounded-md" href="/">
          กำหนดการ
        </Link>
        <Link className=" hover:bg-tertbg/20 flex justify-center items-center px-4 duration-200 rounded-md" href="/">
          กีฬาทั้งหมด
        </Link> */}
        <Link
          className=" hover:bg-tertbg/20 flex justify-center items-center px-4 duration-200 rounded-md"
          href="/pdpa"
        >
          กฏระเบียบ/PDPA
        </Link>
        <Link
          className=" hover:bg-tertbg/20 flex justify-center text-firsto items-center px-4 duration-200 rounded-md"
          href="/dashboard"
        >
          ADMIN
        </Link>
      </div>
      <div className="flex-row flex gap-2 justify-self-end border-l-2 border-tertbg/20 pl-3">
        {session ? (
          <div className="flex-row flex gap-2 items-center">
            <Link href="/players/1" className="border-1 px-3 py-1 rounded-sm">
              {session.user?.name?.split(' ')[0]}
            </Link>
            <Button onPress={() => signOut()} className="bg-firsto text-secondw rounded-sm text-medium">
              ออกจากระบบ
            </Button>
          </div>
        ) : (
          <div>
            <Button onPress={() => signIn('google')} className="bg-firsto text-secondw rounded-sm text-medium">
              เข้าสู่ระบบ
            </Button>
          </div>
        )}
        <button onClick={onOpen} className="md:hidden">
          <MenuIcon size={30} />
        </button>
        <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} className="md:hidden rounded-none">
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-row gap-1 items-center text-center justify-center text-xl p-0">
                  <Button onPress={onClose} className="w-full rounded-none p-8 text-xl bg-tertbg/10" isIconOnly>
                    Close
                    <ChevronRight />
                  </Button>
                </DrawerHeader>
                <DrawerBody className="flex flex-col justify-center mb-16">
                  {/* <Link href="/" className="w-full rounded-none p-4 text-xl text-center">
                    นักกีฬา
                  </Link>
                  <Link href="/" className="w-full rounded-none p-4 text-xl text-center">
                    กำหนดการ
                  </Link>
                  <Link href="/" className="w-full rounded-none p-4 text-xl text-center">
                    กีฬาทั้งหมด
                  </Link> */}
                  <Link onClick={onOpenChange} href="/pdpa" className="w-full rounded-none p-4 text-xl text-center">
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
