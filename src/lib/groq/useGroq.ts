import { useState, useCallback, useMemo } from 'react';
import { callGroqAPI, GroqAPIError } from './api';
import type { GroqMessage, GroqResponse } from './types';

interface UseGroqReturn {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  reset: () => void;
}

export function useGroq(): UseGroqReturn {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const messages: GroqMessage[] = [
        { role: 'user', content: message }
      ];

      const result = await callGroqAPI(messages);
      setResponse(result.choices[0]?.message?.content || null);
    } catch (err) {
      const errorMessage = err instanceof GroqAPIError
        ? err.message
        : 'An unexpected error occurred';
      setError(errorMessage);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(() => ({
    response,
    isLoading,
    error,
    sendMessage,
    reset,
  }), [response, isLoading, error, sendMessage, reset]);
} 