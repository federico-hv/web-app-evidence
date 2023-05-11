import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import BookmarksPage from './';

describe('Page: Channels', () => {
  it('should be have a heading with "Bookmarks page"', () => {
    render(<BookmarksPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Bookmarks page',
    );
  });
});
