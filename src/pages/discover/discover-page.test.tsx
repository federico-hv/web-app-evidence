import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import DiscoverPage from './';

describe('Page: Discover', () => {
  it('should be have a heading with "Discover page"', () => {
    render(<DiscoverPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Discover page',
    );
  });
});
