import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter, Chip } from '@heroui/react';
// import { Matches } from '@/app/players/[id]/page';
import { Button } from '@heroui/button';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

import { Card, CardBody, CardHeader } from '@heroui/react';

import { format, parseISO } from 'date-fns';

type match = {
  id: number;
  date: string;
  time: string;
  sport: string;
  type: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
};

type players = {
  homeTeam: { id: number; name: string; registered: boolean }[];
  awayTeam: { id: number; name: string; registered: boolean }[];
};

type MatchesDetailProps = {
  match: match;
  players: Record<
    number,
    {
      homeTeam: { id: number; name: string; registered: boolean }[];
      awayTeam: { id: number; name: string; registered: boolean }[];
    }
  >;
  // selectedDate: string;
};

export default function MatchesDetail({ match, players }: MatchesDetailProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="max-w-6xl">
          <ModalHeader className="flex flex-col gap-2">
            <h1 className="text-5xl">Match Details</h1>
            <h2 className="text-3xl font-normal">
              {match.homeTeam} vs {match.awayTeam} - {format(parseISO(match.date), 'PPP')} at {match.time}
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row justify-center gap-4 text-2xl">
              <Card className="w-full">
                <CardHeader>{match.homeTeam}</CardHeader>
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableColumn className="text-2xl">Player</TableColumn>
                      <TableColumn className="text-2xl">Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {players[match.id]?.homeTeam.map((player) => (
                        <TableRow key={player.id}>
                          <TableCell className="text-2xl">{player.name}</TableCell>
                          <TableCell className="text-2xl">
                            {player.registered ? (
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
              <p className="w-1/4 text-center">0-0</p>
              <Card className="w-full">
                <CardHeader>{match.awayTeam}</CardHeader>
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableColumn className="text-2xl">Player</TableColumn>
                      <TableColumn className="text-2xl">Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {players[match.id]?.awayTeam.map((player) => (
                        <TableRow key={player.id}>
                          <TableCell className="text-2xl">{player.name}</TableCell>
                          <TableCell className="text-2xl">
                            {player.registered ? (
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
