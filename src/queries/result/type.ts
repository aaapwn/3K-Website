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

export type CreateMatchResult = {
    matchId: string;
    homeTeam: string;
    awayTeam: string;
    scoreA: number;
    scoreB: number;
}

export type CreataeAthleticResult = {
    matchId: string;
    results: {
        userId : string;
        time: number;
    }[];
}
