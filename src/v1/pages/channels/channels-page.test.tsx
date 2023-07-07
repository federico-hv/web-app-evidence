import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import ChannelsPage from './index';

describe('Page: Channels', () => {
  it('should be have a heading with "Channels page"', () => {
    render(<ChannelsPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Channels page',
    );
  });
});
