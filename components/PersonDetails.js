// components/PersonDetails.js

"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';

const PersonDetails = ({ personId }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchesError, setMatchesError] = useState(null);

  useEffect(() => {
    if (personId) {
      const fetchPerson = async () => {
        try {
          const response = await fetch(`/api/persons/${personId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch person details');
          }
          const data = await response.json();
          setPerson(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPerson();
    }
  }, [personId]);

  const fetchMatches = async () => {
    setLoadingMatches(true);
    setMatchesError(null); // Reset error state
    try {
      const response = await fetch(`/api/persons/${personId}/matches`);
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
      {error && <p>Error: {error}</p>}
      {person ? (
        <div>
          <h1>{person.name}</h1>
          <p>Position: {person.position}</p>
          <p>Date of Birth: {person.dateOfBirth}</p>
          <p>Nationality: {person.nationality}</p>
          <button onClick={fetchMatches}>Load Recent Matches</button>
          {loadingMatches && <p>Loading matches...</p>}
          {matchesError && <p>Error: {matchesError}</p>}
          {matches.length > 0 && (
            <div>
              <h2>Recent Matches</h2>
              <ul>
                {matches.map((match) => (
                  <li key={match.id}>
                    <p>Competition: {match.competition.name}</p>
                    <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
                    <p>Home Team: {match.homeTeam.name}</p>
                    <p>Away Team: {match.awayTeam.name}</p>
                    <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                    <p>Status: {match.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No person found</p>
      )}
    </div>
  );
};

export default PersonDetails;
