// components/TeamsList.js

"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';

const TeamsList = ({ competitionId }) => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (competitionId) {
      const fetchTeams = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/competitions/${competitionId}/teams`);
          if (!response.ok) {
            throw new Error('Failed to fetch teams');
          }
          const data = await response.json();
          setTeams(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTeams();
    }
  }, [competitionId]);

  if (loading) return <p>Loading teams...</p>;

  return (
    <div>
      <h2>Teams in Competition</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {teams.length > 0 ? (
          teams.map((team) => (
            <li key={team.id}>
              <a href={`/teams/${team.id}`}>{team.name}</a>
              <p>Short Name: {team.shortName}</p>
              <p>Founded: {team.founded}</p>
              <p>Country: {team.area.name}</p>
              {/* Add more details as needed */}
            </li>
          ))
        ) : (
          <p>No teams found</p>
        )}
      </ul>
    </div>
  );
};

export default TeamsList;
