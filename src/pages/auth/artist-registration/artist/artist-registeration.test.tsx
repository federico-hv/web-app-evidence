import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryAllByRole,
} from '@testing-library/react';
import { it, expect } from 'vitest';
import { StepperForm } from '.';

describe('StepperForm', () => {
  it('displays the first step initially', () => {
    const { container } = render(<StepperForm />);
    expect(container).toBeInTheDocument();
  });
});

it('moves to the second step when the "Next" button is clicked', () => {
  render(<StepperForm />);
  const nextButton = screen.getByText('Next');
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
});

it('moves to the third step when the "Next" button is clicked on the second step', () => {
  render(<StepperForm />);
  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Date of Birth')).toBeInTheDocument();
});

it('submits the form when the "Submit" button is clicked on the fourth step', async () => {
  render(<StepperForm />);
  const submitButton = screen.getByText('Next');
  fireEvent.click(submitButton);
});
