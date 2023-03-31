import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { HomePage } from 'pages';

import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  it('renders the navigation and sign up form', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const navigation = getByText('Log in');
    const header = getByText('Bridging music and community');
    const fanButton = getByRole('button', { name: 'Continue as a Fan' });
    const artistButton = getByRole('button', {
      name: 'Continue as an Artist',
    });
    const bandButton = getByRole('button', { name: 'Continue as a Band' });

    expect(screen.getByText(/terms of use/i)).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
    expect(fanButton).toBeInTheDocument();
    expect(artistButton).toBeInTheDocument();
    expect(bandButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });

  test('clicking the "Log in" button navigates to the login page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    expect(location.pathname).toBe('/');
  });
});
