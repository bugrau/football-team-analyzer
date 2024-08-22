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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Team Details
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Discover in-depth information about the team and its players
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        {team ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <img src={team.crest} alt={team.name} className="w-24 h-24 object-contain mr-6" />
              <div>
                <h2 className="text-3xl font-semibold">{team.name}</h2>
                <p className="text-gray-600">{team.area.name}</p>
              </div>
            </div>
            <p className="mb-2"><span className="font-semibold">Address:</span> {team.address}</p>
            <p className="mb-4">
              <span className="font-semibold">Website:</span>{' '}
              <a href={team.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {team.website}
              </a>
            </p>
            <h3 className="text-2xl font-semibold mb-4">Players:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.squad.map((player) => (
                <li key={player.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <Link href={`/players/${player.id}/matches`} className="text-lg font-medium text-blue-600 hover:underline">
                    {player.name}
                  </Link>
                  <p className="text-sm text-gray-600">Position: {player.position}</p>
                  <p className="text-sm text-gray-600">Shirt Number: {player.shirtNumber}</p>
                  <p className="text-sm text-gray-600">Market Value: {player.marketValue}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading team details...</p>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Football Teams. All rights reserved.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }
  };
}