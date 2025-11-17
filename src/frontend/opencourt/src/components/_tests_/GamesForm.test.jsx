import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GamesForm from '../GamesForm';

describe('GamesForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('submits form and clears inputs on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    render(<GamesForm />);

    const gameInput = screen.getByRole('textbox');
    const locationInput = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /Add Game/i });

    fireEvent.change(gameInput, { target: { value: 'Basketball' } });
    fireEvent.change(locationInput, { target: { value: '1' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/games',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      expect(gameInput.value).toBe('');
      expect(locationInput.value).toBe('');
    });
  });

  it('shows error message when API returns an error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ error: 'Invalid Input' }),
    });

    render(<GamesForm />);

    const submitButton = screen.getByRole('button', { name: /Add Game/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid Input/i)).toBeInTheDocument();
    });
  });
});
