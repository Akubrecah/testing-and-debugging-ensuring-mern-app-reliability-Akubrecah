import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../../components/UserList';

// Mock global fetch
global.fetch = jest.fn();

describe('UserList Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders users fetched from API', async () => {
    const mockUsers = [
      { _id: '1', name: 'John Doe' },
      { _id: '2', name: 'Jane Doe' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  it('handles fetch error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
