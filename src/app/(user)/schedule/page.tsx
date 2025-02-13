'use server';

// Mock data for matches and players
import matchesData from '@public/mock.json';
import MatchesSchedulePage from '@/views/schedulePage';

async function getMatchesData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return matchesData;
}

export default async function AdminDashboard() {
  const data = await getMatchesData();

  // get all matches from data ignore the key
  const matches = Object.values(data.matches).flat();
  // get all sports from data ignore the key
  const sports = Object.values(data.sports);
  // get all players from data ignore the key
  const players = Object.values(data.players);

  return <MatchesSchedulePage filteredMatches={matches} sports={sports} players={players} />;
}
