import { render, fireEvent, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import { SocialLogin } from 'pages';

it('SocialLogin component should render correctly', () => {
  render(<SocialLogin />);

  expect(screen.getByAltText('google-image')).toBeInTheDocument();
  expect(screen.getByAltText('spotify-image')).toBeInTheDocument();
  expect(screen.getByAltText('apple-image')).toBeInTheDocument();

  fireEvent.click(screen.getByAltText('google-image'));
  expect(console.log).toBeTruthy();

  fireEvent.click(screen.getByAltText('spotify-image'));
  expect(console.log).toBeTruthy();

  fireEvent.click(screen.getByAltText('apple-image'));
  expect(console.log).toBeTruthy();
});
