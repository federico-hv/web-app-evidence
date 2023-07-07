import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import ProfilePage from './index';

describe('Page: Channels', () => {
  it('should be have a heading with "Profile page"', () => {
    render(<ProfilePage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Profile page',
    );
  });
});
