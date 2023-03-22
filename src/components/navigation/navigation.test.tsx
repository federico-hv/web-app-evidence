import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Navigation } from 'components';

describe('Navigation', () => {
  it('renders components', () => {
    const { container } = render(<Navigation />);
    expect(container).toBeInTheDocument();
  });

  it('renders the logo', () => {
    const { getByAltText } = render(<Navigation />);
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('renders the logo in button', () => {
    const { getByRole } = render(<Navigation />);
    expect(getByRole('button')).toHaveTextContent('Log In');
  });
});
