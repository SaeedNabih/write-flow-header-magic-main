import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callGroqAPI, GroqAPIError } from '../api';

describe('callGroqAPI', () => {
  const mockApiKey = 'test-api-key';
  const mockMessages = [{ role: 'user', content: 'Hello' }];
  const mockResponse = {
    choices: [{ message: { content: 'Hi there!' } }],
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_GROQ_API_KEY', mockApiKey);
  });

  it('should make a successful API call', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await callGroqAPI(mockMessages);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockApiKey}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: mockMessages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should throw error when API key is missing', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', '');

    await expect(callGroqAPI(mockMessages)).rejects.toThrow(
      'Groq API key is missing'
    );
  });

  it('should handle API errors', async () => {
    const errorMessage = 'Invalid API key';
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: { message: errorMessage } }),
    });

    await expect(callGroqAPI(mockMessages)).rejects.toThrow(errorMessage);
  });

  it('should handle network errors', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    await expect(callGroqAPI(mockMessages)).rejects.toThrow('Network error');
  });
}); 