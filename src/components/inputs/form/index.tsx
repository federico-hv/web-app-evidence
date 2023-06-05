import {
  Box,
  FormControl,
  Icon,
  IconButton,
  InputGroup,
} from '@holdr-ui/react';
import React from 'react';
import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import FormField from './form-field';

const AppearingBox = motion(Box);

function FormInput({
  placeholder,
  label,
  leftIcon,
  rightIcon,
  name,
  type,
  onClickButton,
  ...others
}: FormInputProps) {
  const [field, meta] = useField(name);

  return (
    <FormControl>
      {label && (
        <FormControl.Label
          htmlFor={name}
          casing='capitalize'
          color='base400'
        >
          {label}
        </FormControl.Label>
      )}
      <InputGroup variant='filled'>
        {leftIcon && (
          <InputGroup.LeftElement>
            <Icon color='base300' name={leftIcon} />
          </InputGroup.LeftElement>
        )}
        <FormField
          type={type}
          placeholder={placeholder}
          {...field}
          {...others}
        />
        {rightIcon && (
          <InputGroup.RightElement>
            <IconButton
              onClick={onClickButton}
              type='button'
              icon={rightIcon}
              ariaLabel='action'
              size='sm'
              variant='ghost'
            />
          </InputGroup.RightElement>
        )}
      </InputGroup>

      <FormControl.ErrorText>
        <AnimatePresence>
          {field.value.length && (
            <AppearingBox
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'fit-content', opacity: 1 }}
              as='span'
            >
              {meta.error}
            </AppearingBox>
          )}
        </AnimatePresence>
      </FormControl.ErrorText>
    </FormControl>
  );
}
FormInput.displayName = 'FormInput';

export default FormInput;
