"use client";

import { Session } from "next-auth";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { extendVariants } from "@heroui/react";
import toast from "react-hot-toast";
import {Select, SelectItem} from "@heroui/react";

import { getUserSchedule, checkInUser } from "@/queries/schedule/query";
import { UserProfile } from "@/queries/user/type";
import { APIError } from "@/libs/axiosClient";
import { set } from "date-fns";

type ScanQRProps = {
  session: Session | null;
};


const MySelect = extendVariants(Select, {
    variants: {
      size: {
        xl: {
          trigger: "h-14 px-4",
          value: "text-xl",
          // Add other necessary styles for xl size
        },
      },
    },
  });

const CheckIn = ({ session }: ScanQRProps) => {
  const scanner = useRef<QrScanner>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserProfile>();
  const [selectSchedule, setSelectSchedule] = useState<string>('');
  let tempData = "";

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onCheckInUser = async (qr_key: string) => {
    const id = toast.loading("กำลังลงทะเบียนนักกีฬา...");

    try {
        await checkInUser(session?.accessToken as string, qr_key, selectSchedule);
        toast.success("ลงทะเบียนนักกีฬาสำเร็จ", { id });
    } catch (error:unknown) {
        const apiError = error as APIError;
        toast.error(apiError.message, { id });
    }
    
    onClose();
    setUserData(undefined);
    setSelectSchedule('');
  }

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (result.data === tempData) return;
    tempData = result.data;

    const data = await getUserSchedule(
      session?.accessToken as string,
      result.data
    );

    if (data) {
        onOpen();
        setUserData(data);
    } else {
        toast.error("ไม่พบข้อมูลผู้ใช้", { id: "error" });
    }

  };

  // Fail
  const onScanFail = (err: string | Error) => {
    console.log(err);
    tempData = "";
  };

  useEffect(() => {
    console.log(videoEl?.current && !scanner.current);
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
        maxScansPerSecond: 0.75,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  return (
    <>
      {qrOn ? (
        <video
          ref={videoEl}
          className="absolute top-0 left-0 w-full h-dvh"
        ></video>
      ) : (
        <div>
          <p>ไม่สามารถเข้าถึงกล้องได้ โปรดลองอีกครั้ง</p>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-3xl font-bold">รายละเอียดผู้เข้าแข่งขัน</p>
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <p className="text-2xl font-bold">
                    {`${userData?.prefix_en}${userData?.firstname_en} ${userData?.lastname_en}` ||
                      "ไม่พบข้อมูล"}
                  </p>
                  <p className="text-2xl font-normal">
                    {userData?.studentID || "ไม่พบข้อมูล"} |{" "}
                    {userData?.college || "ไม่พบข้อมูล"}
                  </p>

                  <div className="mt-3">
                    <Select
                        label="เลือกกีฬาที่ต้องการลงทะเบียน"
                        selectedKeys={[selectSchedule]}
                        variant="bordered"
                        classNames={{
                            label: "text-base",
                            value: "text-2xl",
                            
                        }}
                        onChange={(e) => setSelectSchedule(e.target.value)}
                    >
                        {
                           userData?.sportEvents ? (
                                 userData?.sportEvents.map((sportEvent) => (
                                      <SelectItem value={sportEvent.id} key={sportEvent.id}>
                                        {sportEvent.Sport.name}
                                      </SelectItem>
                                 ))
                            ) : (
                                 <SelectItem value="">ไม่พบข้อมูล</SelectItem>
                           ) 
                        }
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="border-tertbg text-xl border-1 rounded-md text-tertbg bg-secondw px-5 py-2"
                >
                  ยกเลิก
                </Button>
                <Button
                  onPress={() => onCheckInUser(userData?.qr_key as string)}
                  className="border-firsto text-xl border-1 rounded-md text-white bg-firsto px-5 py-2"
                >
                    ลงทะเบียน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckIn;
