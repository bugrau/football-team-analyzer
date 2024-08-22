// pages/index.js

import CompetitionsList from "../../components/CompetitionsList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Football Competitions
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore the world's top football leagues and tournaments. Get the latest information on teams, players, and matches.
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <CompetitionsList />
      </main>
      
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Football Competitions. All rights reserved.</p>
      </footer>
    </div>
  );
}