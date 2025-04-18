"use server";
import auth from "@/libs/auth";
import ScanQR from "@/views/ScanQR";

const Page = async () => {
    const session = await auth();
    return (
        <div className="h-dvh">
            <ScanQR session={session} />
        </div>
    )
}
export default Page;