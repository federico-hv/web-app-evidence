import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePage } from 'pages';

describe('HomePage', () => {
  it('renders the sign up header', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Bridging music and community')).toBeInTheDocument();
  });

  it('renders the "Continue as a Fan" button', () => {
    const { getByRole } = render(<HomePage />);
    expect(
      getByRole('button', { name: 'Continue as a Fan' }),
    ).toBeInTheDocument();
  });

  it('renders the "Continue as an Artist" button', () => {
    const { getByRole } = render(<HomePage />);
    expect(
      getByRole('button', { name: 'Continue as an Artist' }),
    ).toBeInTheDocument();
  });

  it('renders the "Continue as a Band" button', () => {
    const { getByRole } = render(<HomePage />);
    expect(
      getByRole('button', { name: 'Continue as a Band' }),
    ).toBeInTheDocument();
  });

  it('renders the terms and privacy policy statement', () => {
    const { getByText } = render(<HomePage />);
    expect(screen.getByText(/terms of use/i)).toBeInTheDocument();
  });
});
