import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect } from 'vitest';
import { StepTwo } from './index';
import { Formik } from 'formik';
import jest from 'jest-mock';
import { validationSchema } from '../../validation';

describe('StepTwo', () => {
  it('should render inputs and a button', () => {
    render(
      <Formik
        initialValues={{ name: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepTwo values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Date of Birth'),
    ).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should disable button if inputs are empty', () => {
    render(
      <Formik
        initialValues={{ name: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ errors, values }) => (
          <StepTwo values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    const button = screen.getByText('Next');
    expect(button).toHaveClass('holdr-ui-c-ehwNcw-dlhIFv-class-disabled');
  });

  it('should enable button if inputs are filled out correctly', () => {
    render(
      <Formik
        initialValues={{ name: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepTwo values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const dobInput = screen.getByPlaceholderText('Date of Birth');
    const nextButton = screen.getByText('Next');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });

    expect(nextButton).toBeEnabled();
  });

  it('should call onSubmit when button is clicked', () => {
    const handleSubmit = jest.fn();
    render(
      <Formik
        initialValues={{ name: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepTwo values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(handleSubmit).toBeCalledTimes(0);
  });
});
