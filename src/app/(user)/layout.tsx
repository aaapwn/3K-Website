"use server";

import React from 'react'
import UserNavbar from '@/components/nav/UserNavbar'

import auth from '@/libs/auth';

type Props = {
    children: Readonly<React.ReactNode>
}

const layout = async ({ children }: Props) => {
    const session = await auth();
    return (
        <>
            <UserNavbar session={session} />
            {children}
        </>
    )
}

export default layout