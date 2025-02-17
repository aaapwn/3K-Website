import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Chip,
  CardHeader,
} from '@heroui/react';
import { Button } from '@heroui/button';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Card, CardBody } from '@heroui/react';
import { useState } from 'react';
// import { Tabs, Tab } from '@heroui/react';

import { User } from '@/queries/user/type';

type DisplayOption = {
  index: boolean;
  studentId: boolean;
  name: boolean;
  status: boolean;
};

const defaultDisplayOption: DisplayOption = {
  index: true,
  studentId: true,
  name: true,
  status: true,
};

type MatchesDetailProps = {
  players: {
    user: User;
    isCheckin: boolean;
  }[];
  option?: Partial<DisplayOption>;
};

const column = [
  { key: 'index', label: 'ลำดับ' },
  { key: 'studentId', label: 'รหัสนักศึกษา' },
  { key: 'name', label: 'ชื่อ' },
  { key: 'status', label: 'สถานะ' },
];

export default function MatchesDetail({ players, option }: MatchesDetailProps) {
  const displayColumn = column.filter(
    (col) => option?.[col.key as keyof DisplayOption] ?? defaultDisplayOption[col.key as keyof DisplayOption]
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const college = Array.from(new Set(players.map((player) => player.user.college)));

  const [selectedCollege, setSelectedCollege] = useState<string>(college[0]);

  const toggleColhandler = (college: string) => {
    setSelectedCollege(college);

    onOpen();
  };

  const getDisplayRow = (player: { user: User; isCheckin: boolean }, index: number) => {
    return displayColumn.map((key) => {
      switch (key.key) {
        case 'index':
          return index + 1;
        case 'studentId':
          return player.user.studentId;
        case 'name':
          return `${player.user.prefix_th}${player.user.firstname_th} ${player.user.lastname_th}`;
        case 'status':
          return player.isCheckin ? (
            <Chip className="bg-green-500 text-secondw">ลงทะเบียนแล้ว</Chip>
          ) : (
            <Chip variant="bordered" className="text-red-500">
              ยังไม่ลงทะเบียน
            </Chip>
          );
        default:
          return '';
      }
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" className="hello there">
        <ModalContent className="max-w-6xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                <h1 className="text-4xl">รายชื่อผู้เข้าแข่งขัน</h1>
                <h1 className="text-2xl">{selectedCollege}</h1>
                <h2 className="text-xl" >
                  {/* mathces detail */}
                  
                </h2>
              </ModalHeader>

              <ModalBody className="flex flex-col justify-center gap-4 text-2xl max-h-[70vh]">
                <div className="overflow-y-auto">
                  <Card key={selectedCollege}>
                    <CardBody>
                      <Table>
                        <TableHeader>
                          {displayColumn.map((col) => (
                            <TableColumn key={col.key} className="text-2xl">
                              {col.label}
                            </TableColumn>
                          ))}
                        </TableHeader>
                        <TableBody>
                          {players
                            .filter((player) => player.user.college === selectedCollege)
                            .map((player, index) => (
                              <TableRow key={index}>
                                {getDisplayRow(player, index).map((cell, i) => (
                                  <TableCell key={i} className="text-2xl">
                                    {cell}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="gap-1 flex">
        {college.map((college) => (
          <Button
            key={college}
            onPress={() => toggleColhandler(college)}
            variant="bordered"
            size="lg"
            className="text-xl rounded-md"
          >
            {college}
          </Button>
        ))}
      </div>
    </>
  );
}
