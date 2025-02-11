"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';

const UserDataPopUp = () => {
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
      </>
    );
}

export default UserDataPopUp