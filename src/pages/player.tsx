"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

import { getProfile } from "@/queries/user/query";
import { UserProfile } from "@/queries/user/type";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import PlayerCard from "./playersection/playercard";
import PlayerTable from "./playersection/playertable";
import PlayerNotConnect from "./playersection/playetNotConnect";

type PlayerProfileProps = Readonly<{
  session: Session | null;
}>;

const PlayerPage = ({ session }: PlayerProfileProps) => {
  const { data, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(session?.accessToken as string),
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#FFC72C]/10 px-5 py-5 flex flex-col gap-10">
      <div className="w-full flex flex-row justify-between items-center">
        <Link
          href="/"
          className="flex flex-row gap-1 w-fit rounded-full bg-white border-1 border-firsto px-5 py-2 text-firsto"
        >
          <ChevronLeft />
          กลับหน้าแรก
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex xl:flex-row flex-col justify-center gap-5 items-center lg:items-start content-start">
          <>
            {data ? (
              <>
                <PlayerCard playerData={data} />
                <PlayerTable sportEvents={data.sportEvents} />
              </>
            ) : (
              <>
                <PlayerNotConnect />
              </>
            )}
          </>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerPage;
