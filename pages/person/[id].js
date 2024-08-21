// pages/persons/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PersonDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPersonDetails = async () => {
        setLoading(true);
        try {
          console.log('Fetching details for ID:', id); // Log the ID to ensure it's defined
          const response = await fetch(`/api/persons/${id}`);
          
          // Log the response status
          console.log('API Response Status:', response.status);

          if (!response.ok) {
            throw new Error('Failed to fetch person details');
          }

          const data = await response.json();
          console.log('Data received:', data); // Log the data received

          setPerson(data);
        } catch (err) {
          console.error('Error fetching person details:', err.message); // Log the error
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPersonDetails();
    }
  }, [id]);

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
          <p>Position: {person.position}</p>
          <p>Shirt Number: {person.shirtNumber}</p>
          <p>Last Updated: {new Date(person.lastUpdated).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No person data found.</p>
      )}
    </div>
  );
}
