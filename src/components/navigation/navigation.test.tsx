import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Navigation } from 'components';
import jest from 'jest-mock';

describe('Navigation', () => {
  it('renders the logo and button', () => {
    const { getByAltText, getByText } = render(
      <Navigation text='Sign in' link={() => {}} />,
    );
    const logo = getByAltText('logo');
    const button = getByText('Sign in');
    expect(logo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls link when button is clicked', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <Navigation text='Sign in' link={mockFn} />,
    );
    const button = getByText('Sign in');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
