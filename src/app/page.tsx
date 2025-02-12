'use server';

import auth from '@/libs/auth';
import Landing from '@/pages/Landing';
import matchesData from '@public/mock.json';

async function getMatchesData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return matchesData;
}

const Page = async () => {
  const session = await auth();
  const data = await getMatchesData();

  // get all matches from data ignore the key
  const matches = Object.values(data.matches).flat();
  // get all players from data ignore the key
  const players = Object.values(data.players);

  return <Landing session={session} filteredMatches={matches} players={players} />;
};

export default Page;
