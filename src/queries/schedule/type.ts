import { User } from "../user/type";

export type Schedule = {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
    // result: Object;
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

type EventData = {
    data: {
        scoreA: number;
        scoreB: number;
        teamA: string;
        teamB: string;
    }
    type: string;
}

type AtleticsData = {
    data: {
        userId: string;
        time: number;
    }[]
    type: string;
}
