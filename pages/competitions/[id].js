// pages/competitions/[id].js

import { useRouter } from 'next/router';
import TeamsList from '../../components/TeamsList';

const CompetitionDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Competition Details
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore teams and standings for this football competition
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <TeamsList competitionId={id} />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Football Competitions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CompetitionDetails;