import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { HomePage } from './';

describe('Page: NotFound', () => {
  it('should be have a textbox with "Base Homepage" text', () => {
    render(<HomePage />);

    expect(screen.getByRole('textbox')).toHaveTextContent('Base Homepage');
  });
});
