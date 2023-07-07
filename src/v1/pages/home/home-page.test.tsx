import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import HomePage from './index';

describe('Page: Home', () => {
  it('should be have a heading with "Home page"', () => {
    render(<HomePage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Home page');
  });
});
