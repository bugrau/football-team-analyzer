import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Log the request being made
    console.log(`Fetching match data for player ID: ${id}`);

    const response = await fetch(`https://api.football-data.org/v4/persons/${id}/matches?limit=15`, {
      headers: {
        'X-Auth-Token': process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
      },
    });

    // Log the status of the response
    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Log the data received from the API
    console.log('Data received from API:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching player matches:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
