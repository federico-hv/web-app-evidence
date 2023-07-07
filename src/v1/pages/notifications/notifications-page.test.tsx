import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import NotificationsPage from './index';

describe('Page: Channels', () => {
  it('should be have a heading with "Notifications page"', () => {
    render(<NotificationsPage />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Notifications page',
    );
  });
});
