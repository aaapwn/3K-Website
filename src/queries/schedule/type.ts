import { User } from "../user/type";

export type Schedule = {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
    result: EventData | AthleticsData;
    sport: {
        name: string;
        category: string;
    }
    location: string;
    players: {
        user: User;
        isCheckin: boolean;
    }[];
}

export type EventData = {
    data: {
        scoreA: number;
        scoreB: number;
        teamA: string;
        teamB: string;
    }
    type: string;
}

export type AthleticsData = {
    data: {
        userId: string;
        time: number;
    }[]
    type: string;
}
