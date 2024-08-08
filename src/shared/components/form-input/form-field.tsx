import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { Input, Textarea } from '@holdr-ui/react';
import { textareaCSS } from './form-input.style';
import React from 'react';
import DatePicker from '../date-picker';

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
      {type !== 'select' &&
        type !== 'textarea' &&
        type !== 'date' &&
        type !== 'phone' && (
          <Input
            variant='unstyled'
            color='white500'
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            {...others}
            css={{
              boxSizing: 'border-box',
            }}
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
      {/*{type === 'select' && <Select id={name} {...field} {...others} />}*/}
      {type === 'date' && (
        // <DatePicker
        //   date={field.value}
        //   onChange={field.onChange(name)}
        //   min={others.min as string}
        //   max={others.max as string}
        // />
        <div>Placeholder</div>
      )}
    </>
  );
}
FormField.displayName = 'Input';

export default FormField;
