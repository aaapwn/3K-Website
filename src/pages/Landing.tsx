"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type LandingProps = Readonly<{
  session: Session | null;
}>;

const Landing = ({ session }: LandingProps) => {
    if (session) {
        return (
            <div>
                <img src={session.user?.image as string} alt="profile img" width={100}/>
                <p>email: {session.user?.email}</p>
                <button onClick={() => signOut()}>logout</button>
            </div>
        )
    }
  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn('google')}>Sign in</button>
    </div>
  )
};

export default Landing;
