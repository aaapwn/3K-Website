"use client";

import { Button } from "@heroui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BadmintonShuttleIcon, Chess02Icon, GameController03Icon, WorkoutRunIcon, BowlingBallIcon, TableTennisBatIcon, BasketballIcon, FootballIcon, VolleyballIcon } from "./sporticon";

interface SportBadgeProps {
    children: React.ReactNode;
    sport: string;
}

const SportBadge = (props: SportBadgeProps) => {
    return (
        <div className="flex justify-center gap-5 items-center flex-col">
            <div className="flex justify-center items-center rounded-full bg-secondw p-10 drop-shadow-xl hover:scale-110 duration-200 hover:rotate-12">
                {props.sport === 'badminton' && <BadmintonShuttleIcon />}
                {props.sport === 'chess' && <Chess02Icon />}
                {props.sport === 'gaming' && <GameController03Icon />}
                {props.sport === 'running' && <WorkoutRunIcon />}
                {props.sport === 'bowling' && <BowlingBallIcon />}
                {props.sport === 'tableTennis' && <TableTennisBatIcon />}
                {props.sport === 'basketball' && <BasketballIcon />}
                {props.sport === 'football' && <FootballIcon />}
                {props.sport === 'volleyball' && <VolleyballIcon />}
            </div>
            <p className="text-3xl font-bold">{props.children}</p>
        </div >
    );
}

export default SportBadge;
