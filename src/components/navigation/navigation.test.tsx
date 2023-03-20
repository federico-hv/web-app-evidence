import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Navigation } from 'components';
import '@testing-library/jest-dom';

describe('Navigation', () => {
  it('renders the logo', () => {
    const { getByAltText } = render(<Navigation />);
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  // const { asFragment } = render(<SecondaryBannerPrimary {...props} />);
  //   expect(screen.getByText(props.date)).toBeInTheDocument();
  //   expect(asFragment()).toMatchSnapshot();

  it('renders the log in button', () => {
    const { getByRole } = render(<Navigation />);
    expect(getByRole('button')).toHaveTextContent('Log In');
  });
});
