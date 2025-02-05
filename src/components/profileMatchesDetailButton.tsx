'use client';

import React from 'react';

// import { Session } from 'next-auth';
import { Button } from '@heroui/button';
// import { Chip } from '@heroui/react';

// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Matches } from '@/app/players/[id]/page';

type MatchesDetailButtonProps = {
  matchesData: Matches[];
};

const MatchesDetailButton = ({ matchesData }: MatchesDetailButtonProps) => {
  console.log(matchesData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-3xl font-normal">รายละเอียดการแข่งขัน</p>
                <p className="text-lg font-normal text-tertbg">วันที่ 15/03/68 เวลา 10:00 น.</p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 text-center items-center justify-items-center">
                  <p className="text-5xl font-bold">KMITL</p>
                  <p className="text-3xl font-normal text-secondw bg-firsto rounded-md w-fit px-5 py-2">99-0</p>
                  <p className="text-5xl font-bold">KMUTT</p>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen} className="border-tertbg text-xl border-1 rounded-md text-tertbg bg-secondw px-5 py-2">
        รายละเอียด
      </Button>
    </>
  );
};

export default MatchesDetailButton;
