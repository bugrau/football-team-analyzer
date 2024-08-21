// pages/teams/[id].js

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeamDetails({ params }) {
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`/api/teams/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team details');
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTeamDetails();
  }, [id]);

  return (
    <div>
      <h1>Team Details</h1>
      {error && <p>Error: {error}</p>}
      {team ? (
        <div>
          <h2>{team.name}</h2>
          <img src={team.crest} alt={team.name} />
          <p>Address: {team.address}</p>
          <p>Website: <a href={team.website} target="_blank" rel="noopener noreferrer">{team.website}</a></p>
          <h3>Players:</h3>
          <ul>
            {team.squad.map((player) => (
              <li key={player.id}>
                <Link href={`/players/${player.id}/matches`}>
                  {player.name}
                </Link>
                <p>Position: {player.position}</p>
                <p>Shirt Number: {player.shirtNumber}</p>
                <p>Market Value: {player.marketValue}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading team details...</p>
      )}
    </div>
  );
}

// `getServerSideProps` to pass `id` as a parameter
export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }
  };
}
