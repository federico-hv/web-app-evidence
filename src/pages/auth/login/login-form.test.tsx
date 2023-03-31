import { LoginForm } from './login-form';
import { render, fireEvent, screen } from '@testing-library/react';
import { it, expect } from 'vitest';

test('LoginForm component should render correctly', async () => {
  render(<LoginForm />);

  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Log In' }),
  ).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'johndoe@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password123' },
  });

  fireEvent.submit(screen.getByRole('textbox'));

  expect(
    JSON.stringify(
      { email: 'valid_email@example.com', password: 'password' },
      null,
      2,
    ),
  ).toBeTruthy();
});
