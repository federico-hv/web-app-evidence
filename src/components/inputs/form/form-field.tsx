import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { Input, Textarea } from '@holdr-ui/react';
import { textareaCSS } from './form-input.style';
import React from 'react';
function FormField({
  name,
  type,
  placeholder,
  ...others
}: FormInputProps & { type: 'text' | 'textarea' | string }) {
  const [field] = useField(name);
  return (
    <>
      {type === 'text' && (
        <Input
          variant='unstyled'
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
          {...others}
          css={{ boxSizing: 'border-box' }}
        />
      )}
      {type === 'textarea' && (
        <Textarea
          variant='unstyled'
          id={name}
          placeholder={placeholder}
          {...field}
          {...others}
          className={textareaCSS()}
        />
      )}
    </>
  );
}
FormField.displayName = 'Input';

export default FormField;
