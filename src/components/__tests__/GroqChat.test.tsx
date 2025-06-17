import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GroqChat } from '../GroqChat';
import { useGroq } from '../../lib/groq/useGroq';

// Mock the useGroq hook
vi.mock('../../lib/groq/useGroq');

describe('GroqChat', () => {
  const mockSendMessage = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useGroq as any).mockReturnValue({
      response: null,
      isLoading: false,
      error: null,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });
  });

  it('renders the chat interface', () => {
    render(<GroqChat />);
    
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('handles user input and submission', async () => {
    const user = userEvent.setup();
    render(<GroqChat />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    await user.type(input, 'Hello AI');
    await user.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('Hello AI');
    expect(input).toHaveValue('');
  });

  it('disables input and button while loading', () => {
    (useGroq as any).mockReturnValue({
      response: null,
      isLoading: true,
      error: null,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });

    render(<GroqChat />);
    
    expect(screen.getByPlaceholderText('Type your message...')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('displays loading spinner while loading', () => {
    (useGroq as any).mockReturnValue({
      response: null,
      isLoading: true,
      error: null,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });

    render(<GroqChat />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays AI response', () => {
    const mockResponse = 'This is the AI response';
    (useGroq as any).mockReturnValue({
      response: mockResponse,
      isLoading: false,
      error: null,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });

    render(<GroqChat />);
    
    expect(screen.getByText(mockResponse)).toBeInTheDocument();
  });

  it('displays error message', () => {
    const errorMessage = 'API Error';
    (useGroq as any).mockReturnValue({
      response: null,
      isLoading: false,
      error: errorMessage,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });

    render(<GroqChat />);
    
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('clears chat when reset button is clicked', async () => {
    const user = userEvent.setup();
    (useGroq as any).mockReturnValue({
      response: 'Some response',
      isLoading: false,
      error: null,
      sendMessage: mockSendMessage,
      reset: mockReset,
    });

    render(<GroqChat />);
    
    const resetButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(resetButton);

    expect(mockReset).toHaveBeenCalled();
  });

  it('is responsive on different screen sizes', () => {
    render(<GroqChat />);
    
    const container = screen.getByRole('main');
    expect(container).toHaveClass('max-w-2xl');
  });
}); 