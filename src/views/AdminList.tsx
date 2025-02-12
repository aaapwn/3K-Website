"use client";

import { Session } from "next-auth";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@heroui/react";
import { Button } from "@heroui/button";

import { getAllAdmin, deleteAdmin, createAdmin } from "@/queries/admin/query";
import { Admin } from "@/queries/admin/type";
import {Input} from "@heroui/input";

type Props = Readonly<{
  session: Session | null;
}>;

const AdminList = ({ session }: Props) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [email, setEmail] = useState<string>("");
  const { data, isLoading } = useQuery<Admin[]>({
    queryKey: ["admin-list"],
    queryFn: () => getAllAdmin(session?.accessToken as string),
  });
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const deleteAdminMutate = useMutation({
    mutationFn: (id: string) => deleteAdmin(session?.accessToken as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
    }
  });
  const addAdminMutate = useMutation({
    mutationFn: (email: string) => createAdmin(session?.accessToken as string, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
    }
  });


  const onDelete = (admin_id: string) => {
    const id = toast.loading("กำลังลบข้อมูล...");
    deleteAdminMutate.mutate(admin_id, {
      onSuccess: () => {
        toast.success("ลบข้อมูลสำเร็จ", { id });
        setAdmins(admins.filter((admin) => admin.id !== admin_id));
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการลบข้อมูล", { id });
      },
    });
    onClose();
  };

  const onAddAdmin = () => {
    if (email) {
      const id = toast.loading("กำลังเพิ่มผู้ดูแลระบบ...");
      addAdminMutate.mutate(email, {
        onSuccess: (data) => {
          toast.success("เพิ่มผู้ดูแลระบบสำเร็จ", { id });
          setAdmins([...admins, data]);
          setEmail("");
        },
        onError: () => {
          toast.error("เกิดข้อผิดพลาดในการเพิ่มผู้ดูแลระบบ", { id });
        },
      });
    }
  }

  useEffect(() => {
    if (data) {
      setAdmins(data);
    }
  }, [data, isLoading]);

  return (
    <div className="min-h-dvh p-16">
      <h1 className="text-3xl font-bold mb-6">รายชื่อผู้ดูแลระบบ</h1>
      <div className="flex items-center gap-x-5">
        <Input label="add admin" placeholder="Enter your email" type="email" className="max-w-lg" size="lg" value={email} onValueChange={setEmail} />
        <Button className="bg-firsto text-secondw text-lg" onPress={onAddAdmin}>เพิ่ม</Button>
      </div>

      <Table isStriped aria-label="table with dynamic content" className="mt-5">
        <TableHeader>
          <TableColumn className="bg-firsto text-secondw font-thin text-2xl">
            อีเมล
          </TableColumn>
          <TableColumn className="bg-firsto text-secondw font-thin text-2xl">
            เพิ่มโดย
          </TableColumn>
          <TableColumn className="bg-firsto text-secondw font-thin text-2xl">
            action
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"ไม่พบข้อมูล"}>
          {admins?.map((admin, index) => (
            <TableRow key={index} className="border-t-2">
              <TableCell className=" text-secondb font-thin text-2xl">
                {admin.email}
              </TableCell>
              <TableCell className=" text-secondb font-thin text-2xl">
                {admin.addBy}
              </TableCell>
              <TableCell className=" text-secondb font-thin text-2xl">
                <Button
                  onPress={onOpen}
                  className="bg-red-500 text-white text-lg"
                >
                  ลบ
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    <ModalBody>
                      <h1 className="text-3xl font-bold mb-6">ยืนยันการลบ</h1>
                      <p className="text-2xl">
                        คุณต้องการลบผู้ดูแลระบบนี้ใช่หรือไม่?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        ยกเลิก
                      </Button>
                      <Button color="primary" onPress={() => onDelete(admin.id)}>
                        ลบ
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </TableCell>
            </TableRow>
          )) || []}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminList;
