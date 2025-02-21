"use client";

import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { User } from "@/queries/user/type";
import { getAllUsers } from "@/queries/user/query";

type Props = {
  session: Session | null;
};

const columns = [
  { key: "index", label: "ลำดับ" },
  { key: "studentId", label: "รหัสนักศึกษา" },
  { key: "name", label: "ชื่อ" },
  { key: "college", label: "สถาบัน/มหาวิทยาลัย" },
  { key: "qr_key", label: "QR Code" },
];

const ListUsers = ({ session }: Props) => {
  const { data } = useQuery<User[]>({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(session?.accessToken as string),
  });

  const getDisplayRow = (user: User, index: number) => {
    return columns.map((key) => {
      switch (key.key) {
        case "index":
          return index + 1;
        case "studentId":
          return user.studentId;
        case "name":
          return `${user.prefix_th}${user.firstname_th} ${user.lastname_th}`;
        case "college":
          return user.college;
        case "email":
          return user.email;
        case "qr_key":
          return user.qr_key;
        default:
          return "";
      }
    });
  };

  return (
    <div className="w-full">
      <Table className="max-w-5xl mx-auto my-0">
        <TableHeader>
          {columns.map((col) => (
            <TableColumn key={col.key}>{col.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="ไม่พบรายชื่อ">
          {data
            ? data.map((user, index) => (
                <TableRow key={index}>
                  {getDisplayRow(user, index).map((cell, i) => (
                    <TableCell key={i}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListUsers;
