import { Box, mergeStyles, Textarea, VStack } from '@holdr-ui/react';
import { customInputStyles, textAreaClassName } from '../../styles';
import { TextareaProps } from '@holdr-ui/react/dist/components/text-area/src/text-area.types';
import { ReactNode, useState } from 'react';
import Label from '../label';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

function TextAreaField({
  name,
  required,
  label,
  maxLength,
  placeholder,
  radius = 1,
  maxLines = 6,
  colorTheme = 'white500',
  onChange,
  tooltip,
  value,
  labelProps,
  ...props
}: TextareaProps & {
  name: string;
  maxLength?: number;
  label?: string;
  tooltip?: ReactNode;
  labelProps?: TextProps;
}) {
  const [internalValue, set] = useState<string>(value as string);

  return (
    <VStack gap={2}>
      {label && (
        <Label
          required={required}
          name={name}
          tooltip={tooltip}
          text={label}
          {...labelProps}
        />
      )}

      <Box position='relative'>
        <Textarea
          className={mergeStyles([
            textAreaClassName(),
            customInputStyles(),
          ])}
          name={name}
          value={value}
          radius={radius}
          maxLines={maxLines}
          maxLength={maxLength}
          colorTheme={colorTheme}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e);
            set(e.currentTarget.value);
          }}
          {...props}
        />
        {maxLength && (
          <Box
            position='absolute'
            b='8px'
            r='8px'
            fontSize={1}
            color='white800'
          >
            {internalValue?.length || 0}/{maxLength}
          </Box>
        )}
      </Box>
    </VStack>
  );
}
TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
