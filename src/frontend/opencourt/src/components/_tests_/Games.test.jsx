import { render, screen, waitFor } from '@testing-library/react';
import Games from '../Games';
import { getGames } from '../../api/Games';

vi.mock('../../api/Games', () => ({
  getGames: vi.fn(),
}));

describe('Games component', () => {
  it('shows message when there are no events', async () => {
    getGames.mockResolvedValueOnce([]);

    render(<Games />);

    await waitFor(() => {
      expect(
        screen.getByText(/No events yet\. Create one!/i)
      ).toBeInTheDocument();
    });
  });

  it('renders a list of games when data is returned', async () => {
    getGames.mockResolvedValueOnce([
      { game_name: 'Basketball', location_id: 1 },
      { game_name: 'Soccer', location_id: 2 },
    ]);

    render(<Games />);

    await waitFor(() => {
      expect(
        screen.getByText(/Basketball @ Location #1/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Soccer @ Location #2/i)
      ).toBeInTheDocument();
    });
  });
});
