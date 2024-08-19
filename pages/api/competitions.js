// pages/api/competitions.js

export default async function handler(req, res) {
    try {
      const response = await fetch('https://api.football-data.org/v4/competitions', {
        headers: {
          'X-Auth-Token': process.env.NEXT_PUBLIC_FOOTBALL_API_KEY, // Replace with your actual API key
        },
      });
  
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data.competitions);
    } catch (error) {
      console.error('Error fetching competitions:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  