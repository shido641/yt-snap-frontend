export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes("youtube.com")) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // --- Placeholder logic ---
    // In production, you’d call a transcript+summary service here
    const summary = `Summary for ${url}... (Replace this with actual logic)`;

    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
