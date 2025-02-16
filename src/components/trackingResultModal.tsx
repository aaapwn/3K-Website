import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Chip,
} from "@heroui/react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";

import { User } from "@/queries/user/type";
import { TrackResult } from "@/queries/schedule/type";

type Props = {
  data: TrackResult[];
};

const column = [
  { key: "index", label: "ลำดับ" },
  { key: "college", label: "สถาบัน/มหาวิทยาลัย" },
  { key: "studentId", label: "รหัสนักศึกษา" },
  { key: "name", label: "ชื่อ" },
  { key: "time", label: "เวลา" },
];

export default function TrackingModalResult({ data }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getDisplayRow = (result: TrackResult) => {
    return column.map((key) => {
      switch (key.key) {
        case "index":
          return "";
        case "college":
          return result.user.college;
        case "studentId":
          return result.user.studentId;
        case "name":
          return `${result.user.prefix_th}${result.user.firstname_th} ${result.user.lastname_th}`;
        case "time":
          return result.time;
        default:
          return "";
      }
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="max-w-6xl">
          <ModalHeader className="flex flex-col gap-2">
            <h1 className="text-xl">รายชื่อผู้เข้าแข่งขัน</h1>
          </ModalHeader>
          <ModalBody className="flex flex-col justify-center gap-4 text-2xl max-h-[70vh]">
            <div className="overflow-y-auto">
              <Card>
                <CardBody>
                  <Table>
                    <TableHeader>
                      {column.map((col) => (
                        <TableColumn key={col.key} className="text-2xl">
                          {col.label}
                        </TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {
                        data.map((result, index) => (
                          <TableRow key={result.id}>
                            {getDisplayRow(result).map((cell, i) => (
                              <TableCell key={i} className='text-xl'>{cell || index + 1}</TableCell>
                            ))}
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Button onPress={onOpen} variant="bordered" size="lg" className="text-xl">
        ดูผลการแข่งขัน
      </Button>
    </>
  );
}
