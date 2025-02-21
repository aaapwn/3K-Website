'use server';

import MedalForm from '@/views/add-medal-page.';
import auth from '@/libs/auth';

export default async function AdminAddResult() {
  const session = await auth();

  return <MedalForm />;
}
