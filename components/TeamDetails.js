// components/TeamDetails.js

"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';

const TeamDetails = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teamId) {
      const fetchTeam = async () => {
        try {
          const response = await fetch(`/api/teams/${teamId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const data = await response.json();
          setTeam(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchTeam();
    }
  }, [teamId]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {team ? (
        <div>
          <h1>{team.name}</h1>
          <p>Short Name: {team.shortName}</p>
          <p>Founded: {team.founded}</p>
          <p>Country: {team.area.name}</p>
          <img src={team.crest} alt={`${team.name} Crest`} width="100" />
          <h2>Squad</h2>
          <ul>
            {team.squad.map(player => (
              <li key={player.id}>
                <h3>{player.name}</h3>
                <p>Position: {player.position}</p>
                <p>Date of Birth: {player.dateOfBirth}</p>
                <p>Nationality: {player.nationality}</p>
                <p>Shirt Number: {player.shirtNumber}</p>
                <p>Market Value: ${player.marketValue}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No team found</p>
      )}
    </div>
  );
};

export default TeamDetails;
