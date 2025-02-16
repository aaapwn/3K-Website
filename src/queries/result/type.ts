import { College } from "../user/type";

export type FootballSumary = {
    team: string;
    played: number;
    win: number;
    draw: number;
    lose: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDiff: number;
    points: number;
}

export type MedalSummary = {
    medals: {
        college: College;
        gold: number;
        silver: number;
        bronze: number;
        total: number;
    }[];
    total: {
        gold: number;
        silver: number;
        bronze: number;
        total: number;
    }
}