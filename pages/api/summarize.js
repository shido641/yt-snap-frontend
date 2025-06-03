export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ message: 'Invalid YouTube URL' });
  }

  // Simulate delay like we're doing real processing
  await new Promise((r) => setTimeout(r, 1500));

  // Placeholder summary
  const mockSummary = `📺 Summary of the video at:\n${url}\n\nThis is where your summarized transcript would appear after processing.`;

  res.status(200).json({ summary: mockSummary });
}
