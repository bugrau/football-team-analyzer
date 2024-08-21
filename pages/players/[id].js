import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerMatches() {
  const router = useRouter();
  const { id } = router.query;
  const [matches, setMatches] = useState(null);
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
          setMatches(data.matches);  // Assuming the data structure returned has a `matches` key
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
      {matches ? (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              <p>Match: {match.homeTeam.name} vs {match.awayTeam.name}</p>
              <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
              <p>Competition: {match.competition.name}</p>
              <p>Score: {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No match information available.</p>
      )}
    </div>
  );
}
