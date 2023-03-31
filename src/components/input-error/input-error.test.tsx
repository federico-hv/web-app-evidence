import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { Error } from './';

describe('Error component', () => {
  test('renders error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(<Error error={errorMessage} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  test('does not render when error prop is not provided', () => {
    const { container } = render(<Error error='error' />);
    expect(container.firstChild).toBeVisible();
  });
});
