"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedalSummary } from "@/queries/result/qurey";
import { MedalSummary } from "@/queries/result/type";
import { updateMedal } from "@/queries/result/qurey";
import { UpdateMedal } from "@/queries/result/type";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react"; // ✅ ตรวจสอบ import
import { useEffect } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";

type MedalFormData = {
  KMITL: {
    gold: number;
    silver: number;
    bronze: number;
  };
  KMUTT: {
    gold: number;
    silver: number;
    bronze: number;
  };
  KMUTNB: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

type MedalFormProps = {
  session: Session | null;
};


export default function MedalForm({ session }: MedalFormProps) {
  const queryClient = useQueryClient();
  const { data } = useQuery<MedalSummary>({
    queryKey: ["medal-summary"],
    queryFn: getMedalSummary,
  });
  const mutation = useMutation({
    mutationFn: (data:UpdateMedal) => updateMedal(session?.accessToken ?? "", data),
  });

  const form = useForm<MedalFormData>({
    defaultValues: {
      KMITL: {
        gold: 0,
        silver: 0,
        bronze: 0,
      },
      KMUTT: {
        gold: 0,
        silver: 0,
        bronze: 0,
      },
      KMUTNB: {
        gold: 0,
        silver: 0,
        bronze: 0,
      },
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        KMITL: {
          gold: data.medals.find((medal) => medal.college === "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง")?.gold ?? 0,
          silver: data.medals.find((medal) => medal.college === "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง")?.silver ?? 0,
          bronze: data.medals.find((medal) => medal.college === "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง")?.bronze ?? 0,
        },
        KMUTT: {
          gold: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี")?.gold ?? 0,
          silver: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี")?.silver ?? 0,
          bronze: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี")?.bronze ?? 0,
        },
        KMUTNB: {
          gold: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ")?.gold ?? 0,
          silver: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ")?.silver ?? 0,
          bronze: data.medals.find((medal) => medal.college === "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ")?.bronze ?? 0,
        },
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<MedalFormData> = (values) => {
    const id = toast.loading("กำลังบันทึกข้อมูล...");
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("บันทึกข้อมูลสำเร็จ", { id });
        queryClient.invalidateQueries({ queryKey: ["medal-summary"] });
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", { id });
      },
    });

  };

  return (
    <div className="min-h-dvh relative">
      <div className="w-full bg-firsto py-10 px-5 md:px-20">
        <h1 className="text-5xl text-white">แก้ไขเหรียญรางวัล</h1>
      </div>
      <div className="max-w-5xl mx-auto mt-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Table className="">
              <TableHeader>
                <TableColumn className="text-xl bg-firsto text-white">สถาบัน/มหาวิทยาลัย</TableColumn>
                <TableColumn className="text-xl bg-firsto text-white">Gold</TableColumn>
                <TableColumn className="text-xl bg-firsto text-white">Silver</TableColumn>
                <TableColumn className="text-xl bg-firsto text-white">Bronze</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-lg">KMITL</TableCell>
                  <TableCell>
                    <Controller
                      name="KMITL.gold"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMITL.silver"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMITL.bronze"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-lg">KMUTT</TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTT.gold"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTT.silver"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTT.bronze"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-lg">KMUTNB</TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTNB.gold"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTNB.silver"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="KMUTNB.bronze"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end mb-5">
              <Button type="submit" className="bg-firsto text-white mt-5">บันทึก</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
