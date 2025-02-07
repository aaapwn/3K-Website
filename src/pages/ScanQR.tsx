"use client";

import { Session } from "next-auth";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";


type ScanQRProps = {
    session: Session | null;
};

const ScanQR = ({ session }: ScanQRProps) => {
    const scanner = useRef<QrScanner>(null);
    const videoEl = useRef<HTMLVideoElement>(null);
    const qrBoxEl = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);
    let tempData = "";

    const onScanSuccess = async (result: QrScanner.ScanResult) => {
        if (result.data === tempData) return;
        alert(result.data);
        console.log(result.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        console.log(err);
        tempData = "";
    };

    useEffect(() => {
        console.log(videoEl?.current && !scanner.current)
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
                maxScansPerSecond: 0.75
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
            {
                qrOn ? (
                    <video ref={videoEl} className="fixed top-0 left-0 w-full h-dvh"></video>
                ) : (
                    <div>
                        <p>ไม่สามารถเข้าถึงกล้องได้ โปรดลองอีกครั้ง</p>
                    </div>
                )
            }
        </>
    )
}

export default ScanQR