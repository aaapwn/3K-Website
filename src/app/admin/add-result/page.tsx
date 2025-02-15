'use server';

import AddResultForm from '@/views/add-result-page';
import auth from '@/libs/auth';

export default async function AdminAddResult() {
  const session = await auth();

  return <AddResultForm />;
}
