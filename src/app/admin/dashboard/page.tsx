'use server';

import AdminDashboardClient from '@/views/adminDashboardClient';
import auth from '@/libs/auth';

export default async function AdminDashboard() {
  const session = await auth();

  return <AdminDashboardClient session={session} />;
}
