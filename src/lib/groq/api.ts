import { GroqRequest, GroqResponse, GroqError } from './types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-70b-8192';

export class GroqAPIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GroqAPIError';
  }
}

export async function callGroqAPI(messages: { role: string; content: string }[]): Promise<GroqResponse> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new GroqAPIError('Groq API key is missing. Please add VITE_GROQ_API_KEY to your .env.local file.');
  }

  const requestBody: GroqRequest = {
    model: GROQ_MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 1024,
  };

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json() as GroqError;
      throw new GroqAPIError(
        errorData.error.message || 'An error occurred while calling the Groq API',
        errorData.error.code
      );
    }

    return await response.json() as GroqResponse;
  } catch (error) {
    if (error instanceof GroqAPIError) {
      throw error;
    }
    throw new GroqAPIError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
} 