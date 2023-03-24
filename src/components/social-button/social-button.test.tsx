import { SocialButton } from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import jest from 'jest-mock';

test('renders a button with the provided props', () => {
  const props = {
    className: 'custom-class',
    disabled: true,
    onClick: jest.fn(),
    children: 'Click me',
  };

  const { container } = render(<SocialButton {...props} />);

  const button = screen.getByRole('button');
  expect(button).toHaveClass(props.className);
  expect(button).toHaveTextContent(props.children);

  fireEvent.click(button);
  expect(container).toBeInTheDocument();
});
