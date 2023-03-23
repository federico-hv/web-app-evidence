import { Formik } from 'formik';
import { Input } from 'components';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AutoCompleteValues } from './input.type';
import userEvent from '@testing-library/user-event';
import jest from 'jest-mock';

describe('Input component', () => {
  const props = {
    name: 'email',
    error: 'Invalid email',
    isPassword: false,
    autoComplete: 'email' as AutoCompleteValues,
    value: '',
    onChange: jest.fn(),
    placeholder: 'Enter your email',
  };

  it('renders an email input', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Input {...props} />
      </Formik>,
    );
    expect(
      screen.getByPlaceholderText('Enter your email'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Email Icon')).toBeInTheDocument();
  });

  it('renders a password input', () => {
    const passwordProps = {
      ...props,
      isPassword: true,
      autoComplete: 'new-password' as AutoCompleteValues,
    };
    const { container } = render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Input {...passwordProps} />
      </Formik>,
    );
    expect(container).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const passwordProps = {
      ...props,
      isPassword: true,
      autoComplete: 'new-password' as AutoCompleteValues,
    };
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Input {...passwordProps} />
      </Formik>,
    );
    const passwordInput = document.querySelector(
      'img',
    ) as HTMLImageElement;
    fireEvent.click(passwordInput);
    expect(passwordInput).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const value = 'test@example.com';
    const onChange = jest.fn();
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Input {...props} onChange={onChange} />
      </Formik>,
    );
    const input = screen.getByPlaceholderText('Enter your email');
    userEvent.type(input, value);
    expect(onChange).toHaveBeenCalledTimes(value.length);
  });

  it('displays error message when provided', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Input {...props} />
      </Formik>,
    );
    expect(screen.findByText('Invalid email')).toBeTruthy();
  });
});
