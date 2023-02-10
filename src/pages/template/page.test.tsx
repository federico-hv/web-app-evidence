import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TemplatePage } from './';

describe('Page: Template', () => {
  it('should be tested', () => {
    render(<TemplatePage />);

    expect(screen.getByRole('textbox')).toHaveTextContent('Template Page');
  });
});
