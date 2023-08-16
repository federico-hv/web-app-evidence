import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { Input, Select, Textarea } from '@holdr-ui/react';
import { textareaCSS } from './form-input.style';
import React from 'react';
import { styled } from '../../../configs';
import DatePicker from '../date-picker';
import PhoneInput from '../phone-input';

export const selectCss = styled('select', {
  'box-sizing': 'border-box',
});

function FormField({
  name,
  type,
  placeholder,
  ...others
}: FormInputProps & {
  type: 'text' | 'textarea' | 'select' | 'phone' | string;
}) {
  const [field] = useField(name);
  return (
    <>
      {type !== 'select' &&
        type !== 'textarea' &&
        type !== 'date' &&
        type !== 'phone' && (
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
        />
      )}
      {type === 'date' && (
        <DatePicker date={field.value} onChange={field.onChange(name)} />
      )}
      {type === 'phone' && (
        <PhoneInput
          prefix={others.prefix}
          phone={field.value}
          onChange={field.onChange(name)}
        />
      )}
    </>
  );
}
FormField.displayName = 'Input';

export default FormField;
