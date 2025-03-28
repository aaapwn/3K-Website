import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter, Chip } from '@heroui/react';
import { Button } from '@heroui/button';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Card, CardBody } from '@heroui/react';

import { User } from '@/queries/user/type';

type MatchesDetailProps = {
  players: {
    user: User;
    isCheckin: boolean;
  }[];
};

export default function MatchesDetail({ players }: MatchesDetailProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="max-w-6xl">
          <ModalHeader className="flex flex-col gap-2">
            <h1 className="text-5xl">รายชื่อผู้เข้าแข่งขัน</h1>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row justify-center gap-4 text-2xl max-h-96">
              <Card className="w-full">
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableColumn className="text-2xl">ลำดับ</TableColumn>
                      <TableColumn className="text-2xl">สถาบัน/มหาวิทยาลัย</TableColumn>
                      <TableColumn className="text-2xl">รหัสนักศึกษา</TableColumn>
                      <TableColumn className="text-2xl">ชื่อ</TableColumn>
                      <TableColumn className="text-2xl">สถานะ</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {players.map((player, index) => (
                        <TableRow key={player.user.id}>
                          <TableCell className="text-2xl">{index+1}</TableCell>
                          <TableCell className="text-2xl">{player.user.college}</TableCell>
                          <TableCell className="text-2xl">{player.user.studentId}</TableCell>
                          <TableCell className="text-2xl">{`${player.user.prefix_th}${player.user.firstname_th} ${player.user.lastname_th}`}</TableCell>
                          <TableCell className="text-2xl">
                            {player.isCheckin ? (
                              <Chip className="bg-green-500 text-xl text-secondw">ลงทะเบียนแล้ว</Chip>
                            ) : (
                              <Chip variant="bordered" className="text-red-500 text-xl">
                                ยังไม่ลงทะเบียน
                              </Chip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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
        รายชื่อผู้เข้าแข่งขัน
      </Button>
    </>
  );
}
