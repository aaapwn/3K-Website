"use client";
import { Session } from "next-auth";
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"

import PlayerCard from "./playersection/playercard";
import PlayerTable from "./playersection/playertable";

import { Player } from "@/app/players/[id]/page";

type PlayerProfileProps = Readonly<{
    playerID: string;
    playerData: Player;
}>;


const PlayerPage = ({
    playerID,
    playerData,
}: PlayerProfileProps) => {

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#FFC72C]/10 px-5 py-5 flex flex-col gap-10">
            <Link href="/" className="flex flex-row w-fit rounded-full bg-white border-1 border-firsto px-5 py-2 text-firsto"> <ChevronLeft />กลับหน้าแรก </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex xl:flex-row flex-col justify-center gap-5 items-center content-start ">
                    <PlayerCard playerData={playerData} />
                    <PlayerTable playerID={playerID} />
                </div>
            </motion.div >
        </div >
    )
};

export default PlayerPage;
