import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Navigation } from 'components';

describe('Navigation', () => {
  it('renders the logo', () => {
    const { getByAltText } = render(<Navigation />);
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('renders the log in button', () => {
    const { getByRole } = render(<Navigation />);
    expect(getByRole('button')).toHaveTextContent('Log In');
  });
});
