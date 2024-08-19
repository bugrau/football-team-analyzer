// pages/api/persons/[id].js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query; // Get the person ID from query parameters

  try {
    const response = await fetch(`http://api.football-data.org/v4/persons/${id}`, {
      headers: {
        'X-Auth-Token': process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
