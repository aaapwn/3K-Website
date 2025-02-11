import axiosClient from "@/libs/axiosClient";
import { UserProfile, User, SportEvent } from "./type";

export const getProfile = (token:string): Promise<UserProfile> => {
    const res = axiosClient.post("/user/profile", {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return {
            ...res.data,
            sportEvents: res.data.sportEvents.map((event: any) => {
                return {
                    ...event,
                    startDatetime: new Date(event.startDatetime),
                    endDatetime: new Date(event.endDatetime),
                } as SportEvent;
            }),
        }
    });
    return res;
};

export const getUserByKey = (token:string, key:string): Promise<User> => {
    const res = axiosClient.get(`/user/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
    return res;
}

export const registerUser = (token:string, qr_key:string): Promise<User> => {
    const res = axiosClient.post(`/user/register/${qr_key}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
    return res;
}