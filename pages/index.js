import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary('');

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setSummary(data.summary || 'No summary available.');
    } catch (err) {
      setSummary('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">YT Snap</h1>
        <p className="text-center text-gray-400 mb-8">Paste a YouTube link and get a summary. Fast, clean, no fluff.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </form>

        {summary && (
          <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}
