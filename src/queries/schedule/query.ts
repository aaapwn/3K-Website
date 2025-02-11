import axiosClient from "@/libs/axiosClient";
import { Schedule } from "./type";
import { UserProfile } from "../user/type";

export const getAllSchedule = (token:string): Promise<Schedule[]> => {
    const res = axiosClient.get("/schedule", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res.data.map((schedule: any) => {
            return {
                ...schedule,
                startDatetime: new Date(schedule.startDatetime),
                endDatetime: new Date(schedule.endDatetime),
            } as Schedule;
        }
    )});
    return res;
}

export const getUserSchedule = (token:string, qr_key:string): Promise<UserProfile> => {
    const res = axiosClient.get(`/schedule/user/${qr_key}`, {
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
                }
            }).filter((event: any) => event.startDatetime > new Date()),
        } as UserProfile;
    });
    return res;
}

export const checkInUser = (token:string, qr_key:string, schedule_id: string) => {
    return axiosClient.post(`/schedule/user/${qr_key}/checkin/${schedule_id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}