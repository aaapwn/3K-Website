'use server';

import MatchesSchedulePage from "@/views/schedulePage";
import auth from "@/libs/auth";


export default async function AdminDashboard() {
  const session = await auth();

  return <MatchesSchedulePage session={session} />;
}
