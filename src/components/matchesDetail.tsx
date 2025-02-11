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
            <h1 className="text-5xl">Match Details</h1>
            {/* <h2 className="text-3xl font-normal">
              {match.homeTeam} vs {match.awayTeam} - {format(parseISO(match.date), 'PPP')} at {match.time}
            </h2> */}
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row justify-center gap-4 text-2xl">
              <Card className="w-full">
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableColumn className="text-2xl">สถาบัน</TableColumn>
                      <TableColumn className="text-2xl">รหัสนักศึกษา</TableColumn>
                      <TableColumn className="text-2xl">ชื่อ</TableColumn>
                      <TableColumn className="text-2xl">สถานะ</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {players.map((player) => (
                        <TableRow key={player.user.id}>
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
        ดูรายละเอียด
      </Button>
    </>
  );
}
