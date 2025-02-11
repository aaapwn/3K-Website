'use server';

import AdminDashboardClient from '@/pages/adminDashboardClient';
import auth from '@/libs/auth';
import { getAllSchedule } from '@/queries/schedule/query';

export default async function AdminDashboard() {
  const session = await auth();
  const data = await getAllSchedule(session?.accessToken as string);

  return <AdminDashboardClient data={data} />;
}
