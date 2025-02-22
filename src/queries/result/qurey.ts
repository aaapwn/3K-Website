import axiosClient from "@/libs/axiosClient";

import { CreataeAthleticResult, MedalSummary } from "./type";
import { FootballSumary, CreateMatchResult } from "./type";

export const getFootballSummary = () : Promise<FootballSumary[]> => {
    const res = axiosClient.get("/result/football/summary").then((res) => {
        return res.data as FootballSumary[];
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
