import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect } from 'vitest';
import { Formik } from 'formik';
import { StepThree } from './index';
import jest from 'jest-mock';
import { validationSchema } from '../../validation';

describe('StepThree', () => {
  it('should render inputs and a button', () => {
    render(
      <Formik
        initialValues={{
          displayName: '',
          username: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepThree values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    expect(
      screen.getByPlaceholderText('Display Name'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should disable button if inputs are empty', () => {
    render(
      <Formik
        initialValues={{
          displayName: '',
          username: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepThree values={values} errors={errors} setPage={() => {}} />
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
          <StepThree values={values} errors={errors} setPage={() => {}} />
        )}
      </Formik>,
    );

    const artistNameInput = screen.getByPlaceholderText('Display Name');
    const usernameInput = screen.getByPlaceholderText('Username');
    const nextButton = screen.getByText('Next');

    fireEvent.change(artistNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe123' } });

    expect(nextButton).toBeEnabled();
  });

  it('should call setPage when button is clicked', () => {
    const handleSetPage = jest.fn();
    render(
      <Formik
        initialValues={{ displayName: '', username: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <StepThree
            values={values}
            errors={errors}
            setPage={handleSetPage}
          />
        )}
      </Formik>,
    );

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(handleSetPage).toHaveBeenCalledWith(3);
  });
});
