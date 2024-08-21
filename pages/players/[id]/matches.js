// pages/players/[id]/matches.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerMatches() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setData(data); // Store the entire response data
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
      {data ? (
        <div>
          <h2>Player Information</h2>
          <p>Name: {data.person?.name || 'N/A'}</p>
          <p>Date of Birth: {data.person?.dateOfBirth || 'N/A'}</p>
          <p>Nationality: {data.person?.nationality || 'N/A'}</p>
          <p>Section: {data.person?.section || 'N/A'}</p>
          <p>Last Updated: {new Date(data.person?.lastUpdated).toLocaleDateString() || 'N/A'}</p>

          <h2>Result Set</h2>
          <p>Count: {data.resultSet?.count || 'N/A'}</p>
          <p>Competitions: {data.resultSet?.competitions || 'N/A'}</p>
          <p>First Match Date: {data.resultSet?.first || 'N/A'}</p>
          <p>Last Match Date: {data.resultSet?.last || 'N/A'}</p>

          <h2>Matches</h2>
          {data.matches && data.matches.length > 0 ? (
            <ul>
              {data.matches.map((match) => (
                <li key={match.id}>
                  <p>Competition: {match.competition?.name || 'N/A'}</p>
                  <p>Season: {match.season?.startDate || 'N/A'} - {match.season?.endDate || 'N/A'}</p>
                  <p>Matchday: {match.matchday || 'N/A'}</p>
                  <p>Status: {match.status || 'N/A'}</p>
                  <p>Home Team: {match.homeTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.home || 'N/A'}</p>
                  <p>Away Team: {match.awayTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.away || 'N/A'}</p>
                  <p>Date: {new Date(match.utcDate).toLocaleDateString() || 'N/A'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No match information available.</p>
          )}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
