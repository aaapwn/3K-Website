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
import toast from "react-hot-toast";
import {Select, SelectItem} from "@heroui/react";

import { getUserSchedule, checkInUser } from "@/queries/schedule/query";
import { UserProfile } from "@/queries/user/type";
import { APIError } from "@/libs/axiosClient";

type ScanQRProps = {
  session: Session | null;
};

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

    try {
      const data = await getUserSchedule(
        session?.accessToken as string,
        result.data
      );
      if (!data) {
        toast.error("ไม่พบข้อมูลผู้เข้าแข่งขัน");
        return;
      }
      setUserData(data);
      onOpen();
    } catch (error:unknown) {
      const apiError = error as APIError;
      toast.error(apiError.message);
    }
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    console.log("aaa", err);
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
  }, [onScanFail, onScanSuccess]);

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
                  <p><b>ชื่อ: </b>{`${userData?.prefix_th}${userData?.firstname_th} ${userData?.lastname_th}`}</p>
                  <p><b>รหัสนักศึกษา: </b>{userData?.studentID || 'ไม่พบข้อมูล'}</p>
                  <p><b>สถาบัน/มหาวิทยาลัย: </b>{userData?.college || 'ไม่พบข้อมูล'}</p>
                  <p><b>หมายเลขเสื้อ: </b>{userData?.shirtNumber || 'ไม่พบข้อมูล'}</p>
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
                                      {`${sportEvent.Sport.category}(${sportEvent.Sport.name})`} - {`${sportEvent.startDatetime.toLocaleDateString("th-TH")}(${sportEvent.startDatetime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })})`}
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
