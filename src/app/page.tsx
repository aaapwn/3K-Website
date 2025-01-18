"use server";

import auth from "@/libs/auth";
import Landing from "@/pages/Landing";

const Page = async () => {
  const session = await auth()
  return (
    <Landing session={session} />
  )
}

export default Page