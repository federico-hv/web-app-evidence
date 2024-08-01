import { Text, VStack } from '@holdr-ui/react';
import { InputTextFieldProps } from './types';
import Label from '../label';
import { AnimatePresence } from 'framer-motion';
import { lightInputStyles } from '../../styles';
import {
  Input,
  InputGroup,
  InputGroupLeftElement,
  InputGroupRightElement,
} from '../../../tmp/input-group';
import AppearingContent from '../appearing-content';

function TextInputField({
  type,
  name,
  errorText,
  tooltip,
  className = lightInputStyles(),
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  labelProps,
  autoComplete,
  leftElement,
  rightElement,
  size,
  css,
  ...props
}: InputTextFieldProps) {
  return (
    <VStack gap={1} flex={1}>
      <VStack as='fieldset'>
        {label && (
          <Label
            name={name}
            tooltip={tooltip}
            text={label}
            {...labelProps}
          />
        )}

        <InputGroup>
          {leftElement && (
            <InputGroupLeftElement>{leftElement}</InputGroupLeftElement>
          )}
          <Input
            size={size}
            type={type}
            autoComplete={autoComplete}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            radius={1}
            className={className}
            color='white500'
            placeholder={placeholder}
            onFocus={onFocus}
            css={{
              '&': errorText
                ? {
                    border: '1px solid $danger300 !important',
                    backgroundColor: 'transparent',
                  }
                : undefined,
              ...css,
            }}
            {...props}
          />
          {rightElement && (
            <InputGroupRightElement>{rightElement}</InputGroupRightElement>
          )}
        </InputGroup>
      </VStack>
      <AnimatePresence>
        {errorText && errorText.length && (
          <AppearingContent>
            <Text
              weight={500}
              color='danger200'
              size={1}
              css={{ marginTop: '$2' }}
            >
              {errorText}
            </Text>
          </AppearingContent>
        )}
      </AnimatePresence>
    </VStack>
  );
}
TextInputField.displayName = 'TextInputField';

export default TextInputField;
