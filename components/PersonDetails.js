// components/PersonDetails.js

"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';

const PersonDetails = ({ personId }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No person found</p>
      )}
    </div>
  );
};

export default PersonDetails;
