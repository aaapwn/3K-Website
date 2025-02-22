import axiosClient from "@/libs/axiosClient";

import { CreataeAthleticResult, MedalSummary } from "./type";
import { SportResultSumary, CreateMatchResult } from "./type";

export const getSportResultSummary = (sport: string) : Promise<SportResultSumary[]> => {
    const res = axiosClient.get(`/result/summary?sport=${sport}`).then((res) => {
        return res.data as SportResultSumary[];
    });
    return res;
}

export const getMedalSummary = () : Promise<MedalSummary> => {
    const res = axiosClient.get("/result/medals").then((res) => {
        return res.data as MedalSummary;
    });
    return res;
}

export const createMatchResult = (token:string, data: CreateMatchResult) => {
    return axiosClient.post("/result/match", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const createAthleticResult = (token:string, data: CreataeAthleticResult) => {
    return axiosClient.post("/result/running", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
