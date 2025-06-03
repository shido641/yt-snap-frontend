import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setSummary('');

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setSummary(data.summary || 'No summary returned.');
    } catch (err) {
      setSummary('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">YT Snap</h1>
        <p className="text-gray-400 mb-8">Summarize any YouTube video in seconds.</p>

        <input
          type="text"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSummarize}
          className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>

        {summary && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left whitespace-pre-wrap">
            {summary}
          </div>
        )}
      </div>
    </main>
  );
}
