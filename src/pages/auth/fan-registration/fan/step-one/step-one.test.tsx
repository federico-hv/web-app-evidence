import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect } from 'vitest';
import { StepOne } from './index';
import { Formik } from 'formik';
import { validationSchema } from '../../validation';

it('renders input and button', () => {
  render(
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, values, isSubmitting }) => {
        return (
          <StepOne values={values} errors={errors} setPage={() => {}} />
        );
      }}
    </Formik>,
  );

  const input = screen.getByPlaceholderText('Email');
  expect(input).toBeInTheDocument();

  const button = screen.getByText('Next');
  expect(button).toBeInTheDocument();
});

it('disables the next button when email input is empty', () => {
  render(
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, values, isSubmitting }) => {
        return (
          <StepOne values={values} errors={errors} setPage={() => {}} />
        );
      }}
    </Formik>,
  );

  const input = screen.getByPlaceholderText('Email');
  fireEvent.change(input, { target: { value: '' } });

  const button = screen.getByText('Next');
  expect(button).toHaveClass('holdr-ui-c-ehwNcw-dlhIFv-class-disabled');
});

it('enables the next button when email is filled in correctly', () => {
  render(
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, values }) => {
        return (
          <StepOne values={values} errors={errors} setPage={() => {}} />
        );
      }}
    </Formik>,
  );

  const input = screen.getByPlaceholderText('Email');
  fireEvent.change(input, { target: { value: 'test@example.com' } });

  const button = screen.getByText('Next');
  expect(button).toHaveClass(
    'holdr-ui-c-ehwNcw holdr-ui-c-ehwNcw-iMxaYK-class-primary',
  );
});
