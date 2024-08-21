// pages/persons/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PersonDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchesError, setMatchesError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPersonDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/persons/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch person details');
          }
          const data = await response.json();
          setPerson(data.person);
          setMatches(data.matches || []); // Set matches data if available
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPersonDetails();
    }
  }, [id]);

  const fetchMatches = async () => {
    setLoadingMatches(true);
    setMatchesError(null); // Reset error state
    try {
      const response = await fetch(`/api/persons/${id}/matches`);
      if (!response.ok) {
        throw new Error('Failed to fetch player matches');
      }
      const data = await response.json();
      setMatches(data.matches || []);
    } catch (err) {
      setMatchesError(err.message);
    } finally {
      setLoadingMatches(false);
    }
  };

  if (loading) return <p>Loading person details...</p>;

  return (
    <div>
      <h1>Person Details</h1>
      {error && <p>Error: {error}</p>}
      {person ? (
        <div>
          <h2>{person.name}</h2>
          <p>Date of Birth: {person.dateOfBirth}</p>
          <p>Nationality: {person.nationality}</p>
          <p>Position: {person.position || 'N/A'}</p>
          <p>Shirt Number: {person.shirtNumber || 'N/A'}</p>
          <p>Last Updated: {new Date(person.lastUpdated).toLocaleDateString()}</p>
          <button onClick={fetchMatches}>Load Recent Matches</button>
          {loadingMatches && <p>Loading matches...</p>}
          {matchesError && <p>Error: {matchesError}</p>}
          {matches.length > 0 && (
            <div>
              <h2>Recent Matches</h2>
              <ul>
                {matches.map((match) => (
                  <li key={match.id}>
                    <p>Competition: {match.competition?.name || 'N/A'}</p>
                    <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
                    <p>Home Team: {match.homeTeam?.name || 'N/A'}</p>
                    <p>Away Team: {match.awayTeam?.name || 'N/A'}</p>
                    <p>Score: {match.score?.fullTime?.home || 'N/A'} - {match.score?.fullTime?.away || 'N/A'}</p>
                    <p>Status: {match.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No person data found.</p>
      )}
    </div>
  );
}
