import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import NotFoundPage from './index';

describe('Page: NotFound', () => {
  it('should be have a heading with "Page Not Found" text', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page Not Found',
    );
  });
});
