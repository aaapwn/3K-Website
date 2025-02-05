'use server';

// Mock data for matches and players
import matchesData from './mock.json';
import AdminDashboardClient from './adminDashboardClient';
async function getMatchesData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return matchesData;
}

export default async function AdminDashboard() {
  const data = await getMatchesData();
  return <AdminDashboardClient data={data} />;
}
