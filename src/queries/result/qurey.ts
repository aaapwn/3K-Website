import axiosClient from "@/libs/axiosClient";

import { MedalSummary } from "./type";
import { FootballSumary } from "./type";

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