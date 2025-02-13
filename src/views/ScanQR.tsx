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
import { useRouter } from "next/navigation";

import { getUserByKey, registerUser } from "@/queries/user/query";
import { User } from "@/queries/user/type";
import { APIError } from "@/libs/axiosClient";

type ScanQRProps = {
  session: Session | null;
};

const ScanQR = ({ session }: ScanQRProps) => {
  const scanner = useRef<QrScanner>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [userData, setUserData] = useState<User>();
  const router = useRouter();
  let tempData = "";

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onRegisterUser = async (qr_key: string) => {
    const id = toast.loading("กำลังลงทะเบียนข้อมูล...");

    try {
        await registerUser(session?.accessToken as string, qr_key);
        toast.success("ลงทะเบียนข้อมูลสำเร็จ", { id });
    } catch (error:unknown) {
        const apiError = error as APIError;
        toast.error(apiError.message, { id });
    }
    
    onClose();
    router.push("/players");
  }

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (result.data === tempData) return;
    tempData = result.data;

    const data = await getUserByKey(
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
  }, [onScanSuccess, onScanFail]);

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
                <p className="text-3xl bold">เจอข้อมูลของคุณแล้ว! 🎉</p>
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <p className="text-2xl font-bold">
                    ชื่อ: {`${userData?.prefix_th}${userData?.firstname_th} ${userData?.lastname_th}` ||
                      "ไม่พบข้อมูล"}
                  </p>
                  <p className="text-2xl font-normal">
                    รหัสนักศึกษา: {userData?.studentId || "ไม่พบข้อมูล"}
                  </p>
                  <p className="text-2xl font-normal">
                    สถาบัน/มหาวิทยาลัย: {userData?.college || "ไม่พบข้อมูล"}
                  </p>
                  <p className="text-red-700 text-lg font-bold mt-3">ข้อมูลถูกต้องหรือไม่ ?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="border-tertbg text-xl border-1 rounded-md text-tertbg bg-secondw px-5 py-2"
                >
                  ไม่ใช่
                </Button>
                <Button
                  onPress={() => onRegisterUser(userData?.qr_key as string)}
                  className="border-firsto text-xl border-1 rounded-md text-white bg-firsto px-5 py-2"
                >
                    ใช่
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScanQR;
