import { User } from "../user/type";

export interface MatchResult {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  eventResultId: string;
  createdAt: string;
}

export interface TrackResult {
  id: string;
  userId: string;
  time: number;
  eventResultId: string;
  createdAt: string;
  user: User;
}

type EventResult =
  | { type: 'Football' | 'Other'; data: MatchResult }
  | { type: 'Track'; data: TrackResult[] };

export type Schedule = {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
    sport: {
        name: string;
        category: string;
    }
    location: string;
    players: {
        user: User;
        isCheckin: boolean;
    }[];
    result: EventResult | null;
}