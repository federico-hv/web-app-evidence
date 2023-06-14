import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { Input, Select, Textarea } from '@holdr-ui/react';
import { textareaCSS } from './form-input.style';
import React from 'react';
import { css } from '../../../configs';

const selectCss = css({
  'box-sizing': 'border-box',
});

function FormField({
  name,
  type,
  placeholder,
  ...others
}: FormInputProps & {
  type: 'text' | 'textarea' | 'select' | string;
}) {
  const [field] = useField(name);
  return (
    <>
      {type !== 'select' && type !== 'textarea' && (
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
      {type === 'select' && (
        <Select
          id={name}
          placeholder={placeholder}
          {...field}
          {...others}
          className={selectCss()}
        />
      )}
    </>
  );
}
FormField.displayName = 'Input';

export default FormField;
