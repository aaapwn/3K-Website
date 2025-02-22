export type SportResultSumary = {
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
        college: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง' | 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี' | 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ';
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

export type UpdateMedal = {
  KMITL: {
    gold: number;
    silver: number;
    bronze: number;
  },
  KMUTT: {
    gold: number;
    silver: number;
    bronze: number;
  },
  KMUTNB: {
    gold: number;
    silver: number;
    bronze: number;
  }
}
