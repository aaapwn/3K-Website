import axiosClient from "@/libs/axiosClient";
import { Admin } from "./type";

export const getAllAdmin = (token:string): Promise<Admin[]> => {
    const res = axiosClient.get("/admin", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
    return res;
}

export const deleteAdmin = (token:string, id:string): Promise<void> => {
    const res = axiosClient.delete(`/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
    return res;
}

export const createAdmin = (token:string, email:string): Promise<Admin> => {
    const res = axiosClient.post("/admin", {
        email,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
    return res;
}