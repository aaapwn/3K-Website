"use server";

import React from 'react'
import AdminNavbar from '@/components/nav/AdminNavbar';

import auth from '@/libs/auth';

type Props = {
    children: Readonly<React.ReactNode>
}

const layout = async ({ children }: Props) => {
    const session = await auth();
    return (
        <>
            <AdminNavbar session={session} />
            {children}
        </>
    )
}

export default layout