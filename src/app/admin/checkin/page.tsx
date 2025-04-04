"use server";

import CheckIn from "@/views/CheckIn";
import auth from "@/libs/auth";

const page = async () => {
  const session = await auth();
  return (
    <div className="h-dvh">
        <CheckIn session={session} />
    </div>
  );
};

export default page;
