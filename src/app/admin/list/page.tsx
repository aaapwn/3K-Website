"use server";

import auth from "@/libs/auth";
import AdminList from "@/views/AdminList";

const page = async () => {
  const session = await auth();
  return <AdminList session={session} />;
};

export default page;
