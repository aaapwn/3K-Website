import { User } from "../user/type";

export type Schedule = {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
    result: Object;
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