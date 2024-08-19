// components/CompetitionsList.js

"use client"; // Ensure this is a client component

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
    <div>
      <h2>Football Competitions</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {competitions.map((comp) => (
          <li key={comp.id}>
            <Link href={`/competitions/${comp.id}`}>
              {comp.name} ({comp.area.name})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompetitionsList;
