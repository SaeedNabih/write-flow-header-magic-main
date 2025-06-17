import { useState } from 'react';
import { useGroq } from '../lib/groq/useGroq';

export function GroqChat() {
  const [input, setInput] = useState('');
  const { response, isLoading, error, sendMessage, reset } = useGroq();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4" role="main">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="flex justify-center" role="status">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700" role="alert">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}

      {(response || error) && (
        <button
          onClick={reset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      )}
    </div>
  );
} 