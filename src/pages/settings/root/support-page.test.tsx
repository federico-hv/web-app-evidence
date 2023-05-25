import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import SettingsPage from './index';

describe('Page: Channels', () => {
  it('should be have a heading with "Settings page"', () => {
    render(<SettingsPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Settings page',
    );
  });
});
