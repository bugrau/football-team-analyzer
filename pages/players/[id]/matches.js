// pages/players/[id]/matches.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerMatches() {
  const router = useRouter();
  const { id } = router.query;
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPlayerMatches = async () => {
        try {
          const response = await fetch(`/api/persons/${id}/matches`);
          if (!response.ok) {
            throw new Error('Failed to fetch match information');
          }
          const data = await response.json();
          setMatches(data.matches); // Assuming the API response has a `matches` field
        } catch (err) {
          setError(err.message);
        }
      };

      fetchPlayerMatches();
    }
  }, [id]);

  return (
    <div>
      <h1>Player Match Information</h1>
      {error && <p>Error: {error}</p>}
      {matches ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <p>Competition: {match.competition.name}</p>
              <p>Season: {match.season.startDate} - {match.season.endDate}</p>
              <p>Matchday: {match.matchday}</p>
              <p>Home Team: {match.homeTeam.name} - {match.homeTeam.score}</p>
              <p>Away Team: {match.awayTeam.name} - {match.awayTeam.score}</p>
              <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading match information...</p>
      )}
    </div>
  );
}
