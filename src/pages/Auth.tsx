"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

import { Button } from "@heroui/button";

type LandingProps = Readonly<{
    session: Session | null;
}>;

const Landing = ({ session }: LandingProps) => {
    if (session) {
        return (
            <div>
                <Image src={session.user?.image as string} alt="profile img" width={100} />
                <p>email: {session.user?.email}</p>
                <Button onPress={() => signOut()} color="danger">Sign out</Button>
            </div>
        )
    }
    return (
        <div>
            <p>Not signed in</p>
            <Button onPress={() => signIn('google')} color="primary">Sign in</Button>
        </div>
    )
};

export default Landing;
