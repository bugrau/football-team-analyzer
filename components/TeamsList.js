// components/TeamsList.js

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  if (loading) return <p className="text-center text-gray-600">Loading teams...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Teams in Competition</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {teams.length > 0 ? (
        <ul className="space-y-6">
          {teams.map((team) => (
            <li key={team.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link href={`/teams/${team.id}`} className="text-xl font-semibold text-blue-700 hover:underline">
                {team.name}
              </Link>
              <p className="text-gray-600"><span className="font-medium">Short Name:</span> {team.shortName}</p>
              <p className="text-gray-600"><span className="font-medium">Founded:</span> {team.founded}</p>
              <p className="text-gray-600"><span className="font-medium">Country:</span> {team.area.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No teams found</p>
      )}
    </div>
  );
};

export default TeamsList;