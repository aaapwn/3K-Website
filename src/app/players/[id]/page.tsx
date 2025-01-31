"use server"

import React from "react"
import { use } from "react"

import PlayerPage from "@/pages/player";

// assume that this data came from fetching the player data from the database
const playerData: Player = {
    id: "1",
    keyForQR: "3-04-01-01-001",
    studentID: "65070020",
    titleThai: "นาย",
    nameThai: "กิตติพัฒน์ เอี่ยมลือนาม",
    titleEnglish: "Mr.",
    nameEnglish: "Kittipat Aiemluenam",
    university: "KMITL",
    sport: "ฟุตบอล",
    sportType: "ทีมชาย",
    jerseyNumber: "1"
};

export type Player = {
    id: string;
    keyForQR: string;
    studentID: string;
    titleThai: string;
    nameThai: string;
    titleEnglish: string;
    nameEnglish: string;
    university: string;
    sport: string;
    sportType: string;
    jerseyNumber: string;
}

const PlayerProfile = (
    {
        params
    }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params)

    return (
        <PlayerPage playerID={resolvedParams.id} playerData={playerData} />
    )
}

export default PlayerProfile;

