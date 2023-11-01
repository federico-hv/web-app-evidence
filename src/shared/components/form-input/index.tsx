import {
  Box,
  FormControl,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  Text,
} from '@holdr-ui/react';
import React from 'react';
import { FormInputProps } from './form-input.types';
import { useField } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import FormField from './form-field';

const AppearingBox = motion(Box);

function FormInput({
  disabled,
  placeholder,
  label,
  leftIcon,
  rightIcon,
  name,
  helperText,
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
          <Text size={2} weight={500}>
            {label}
          </Text>
        </FormControl.Label>
      )}
      {type === 'date' || type === 'phone' ? (
        <FormField
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          {...field}
          {...others}
        />
      ) : (
        <InputGroup
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
          variant='filled'
        >
          {leftIcon && (
            <InputGroup.LeftElement>
              <Icon color='base300' name={leftIcon} />
            </InputGroup.LeftElement>
          )}
          <FormField
            disabled={disabled}
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
      )}
      {helperText && !meta.error && (
        <FormControl.HelperText>
          <HStack items='center' gap={2}>
            <Icon name='information-outline' />
            {helperText}
          </HStack>
        </FormControl.HelperText>
      )}
      {meta.error && (
        <FormControl.ErrorText>
          <AnimatePresence>
            {field.value.length && (
              <AppearingBox
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'fit-content', opacity: 1 }}
                as='span'
              >
                <HStack items='center' gap={2}>
                  <Icon name='information-outline' />
                  {meta.error}
                </HStack>
              </AppearingBox>
            )}
          </AnimatePresence>
        </FormControl.ErrorText>
      )}
    </FormControl>
  );
}
FormInput.displayName = 'FormInput';

export default FormInput;
