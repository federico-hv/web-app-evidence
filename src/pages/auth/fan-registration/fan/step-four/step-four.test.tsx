import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { it, expect } from 'vitest';
import { Formik, Form } from 'formik';
import { StepFour } from './index';
import jest from 'jest-mock';
import { validationSchema } from '../../validation';

describe('StepFour', () => {
  it('submits the form when the submit button is clicked', async () => {
    const mockSetPage = jest.fn();

    render(
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, values, errors }) => (
          <Form>
            <StepFour
              values={values}
              errors={errors}
              setPage={mockSetPage}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>,
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(3);
    });
  });

  it('disables the submit button when any input is empty', () => {
    const mockSetPage = jest.fn();

    render(
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, values, errors }) => (
          <Form>
            <StepFour
              values={values}
              errors={errors}
              setPage={mockSetPage}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>,
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    const button = screen.getByText('Submit');
    expect(button).toHaveClass('holdr-ui-c-ehwNcw-iMxaYK-class-primary');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    expect(submitButton).not.toBeDisabled();
  });

  it('disables the submit button when the passwords do not match', () => {
    const mockSetPage = jest.fn();
    const mockSubmit = jest.fn();

    render(
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, values, errors }) => (
          <Form>
            <StepFour
              values={values}
              errors={errors}
              setPage={mockSetPage}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>,
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'differentPassword' },
    });
    const button = screen.getByText('Submit');
    expect(button).toHaveClass('holdr-ui-c-ehwNcw-iMxaYK-class-primary');
  });
});
