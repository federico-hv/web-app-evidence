import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import ReleasesPage from './';

describe('Page: Releases', () => {
  it('should be have a heading with "Releases page"', () => {
    render(<ReleasesPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Releases page',
    );
  });
});
