// pages/players/[id]/matches.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerMatches() {
  const router = useRouter();
  const { id } = router.query;
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultSet, setResultSet] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPlayerMatches = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/persons/${id}/matches`);
          if (!response.ok) {
            throw new Error('Failed to fetch match information');
          }
          const data = await response.json();
          setMatches(data.matches || []);
          setResultSet(data.resultSet || null); // Store resultSet for additional information
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPlayerMatches();
    }
  }, [id]);

  if (loading) return <p>Loading match information...</p>;

  return (
    <div>
      <h1>Player Match Information</h1>
      {error && <p>Error: {error}</p>}
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <p>Competition: {match.competition?.name || 'N/A'}</p>
              <p>Season: {match.season?.startDate || 'N/A'} - {match.season?.endDate || 'N/A'}</p>
              <p>Matchday: {match.matchday || 'N/A'}</p>
              <p>Home Team: {match.homeTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.home || 'N/A'}</p>
              <p>Away Team: {match.awayTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.away || 'N/A'}</p>
              <p>Date: {new Date(match.utcDate).toLocaleDateString() || 'N/A'}</p>
            </li>
          ))}
        </ul>
      ) : (
        resultSet ? (
          <p>No match information available. Data available from result set: {resultSet.count} matches.</p>
        ) : (
          <p>No match information available and no result set information found.</p>
        )
      )}
    </div>
  );
}
