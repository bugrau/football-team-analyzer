import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerMatches() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPlayerMatches = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/persons/${id}/matches`);
          if (!response.ok) {
            throw new Error('Failed to fetch match information');
          }
          const data = await response.json();
          setData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPlayerMatches();
    }
  }, [id]);

  if (loading) return <p className="text-gray-500 text-center mt-8">Loading match information...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Player Match Information
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore detailed match information for the selected player.
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500 mb-4 text-center">Error: {error}</p>}
        {data ? (
          <div className="space-y-6">
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-4">Player Information</h2>
              <div className="space-y-2">
                <p><strong className="font-medium text-blue-700">Name:</strong> <span className="text-blue-900">{data.person?.name || 'N/A'}</span></p>
                <p><strong className="font-medium text-green-700">Date of Birth:</strong> <span className="text-green-900">{data.person?.dateOfBirth || 'N/A'}</span></p>
                <p><strong className="font-medium text-red-700">Nationality:</strong> <span className="text-red-900">{data.person?.nationality || 'N/A'}</span></p>
                <p><strong className="font-medium text-purple-700">Section:</strong> <span className="text-purple-900">{data.person?.section || 'N/A'}</span></p>
                <p><strong className="font-medium text-gray-700">Last Updated:</strong> <span className="text-gray-900">{new Date(data.person?.lastUpdated).toLocaleDateString() || 'N/A'}</span></p>
              </div>
            </section>

            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-4">Result Set</h2>
              <div className="space-y-2">
                <p><strong className="font-medium text-indigo-700">Count:</strong> <span className="text-indigo-900">{data.resultSet?.count || 'N/A'}</span></p>
                <p><strong className="font-medium text-yellow-700">Competitions:</strong> <span className="text-yellow-900">{data.resultSet?.competitions || 'N/A'}</span></p>
                <p><strong className="font-medium text-teal-700">First Match Date:</strong> <span className="text-teal-900">{data.resultSet?.first || 'N/A'}</span></p>
                <p><strong className="font-medium text-pink-700">Last Match Date:</strong> <span className="text-pink-900">{data.resultSet?.last || 'N/A'}</span></p>
              </div>
            </section>

            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700 mb-4">Matches</h2>
              {data.matches && data.matches.length > 0 ? (
                <ul className="space-y-4">
                  {data.matches.map((match) => (
                    <li key={match.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <p className="mb-2"><strong className="font-medium text-blue-700">Competition:</strong> <span className="text-blue-900">{match.competition?.name || 'N/A'}</span></p>
                      <p className="mb-2"><strong className="font-medium text-green-700">Season:</strong> <span className="text-green-900">{match.season?.startDate || 'N/A'} - {match.season?.endDate || 'N/A'}</span></p>
                      <p className="mb-2"><strong className="font-medium text-red-700">Matchday:</strong> <span className="text-red-900">{match.matchday || 'N/A'}</span></p>
                      <p className="mb-2"><strong className="font-medium text-purple-700">Status:</strong> <span className="text-purple-900">{match.status || 'N/A'}</span></p>
                      <p className="mb-2"><strong className="font-medium text-gray-700">Home Team:</strong> <span className="text-gray-900">{match.homeTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.home || 'N/A'}</span></p>
                      <p className="mb-2"><strong className="font-medium text-gray-700">Away Team:</strong> <span className="text-gray-900">{match.awayTeam?.name || 'N/A'} - Score: {match.score?.fullTime?.away || 'N/A'}</span></p>
                      <p><strong className="font-medium text-gray-700">Date:</strong> <span className="text-gray-900">{new Date(match.utcDate).toLocaleDateString() || 'N/A'}</span></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No match information available.</p>
              )}
            </section>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-8">No data available.</p>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Football Matches. All rights reserved.</p>
      </footer>
    </div>
  );
}
