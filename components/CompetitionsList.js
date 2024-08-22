// components/CompetitionsList.js

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CompetitionsList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competitions');
        if (!response.ok) {
          throw new Error('Failed to fetch competitions');
        }
        const data = await response.json();
        setCompetitions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {competitions.map((comp) => (
          <Link 
            key={comp.id} 
            href={`/competitions/${comp.id}`}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-lg font-semibold text-blue-600">{comp.name}</div>
            <div className="text-sm text-gray-600">{comp.area.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsList;