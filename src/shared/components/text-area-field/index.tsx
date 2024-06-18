import { Box, mergeStyles, Text, Textarea, VStack } from '@holdr-ui/react';
import { customInputStyles, textAreaClassName } from '../../styles';
import { TextareaProps } from '@holdr-ui/react/dist/components/text-area/src/text-area.types';
import { useState } from 'react';

function TextAreaField({
  maxLength,
  placeholder,
  radius = 1,
  maxLines = 6,
  colorTheme = 'white500',
  onChange,
  value,
  ...props
}: TextareaProps & {
  placeholder?: string;
  maxLength?: number;
}) {
  const [internalValue, set] = useState<string>(value as string);

  return (
    <VStack gap={2}>
      <Text
        color='white700'
        size={2}
        weight={500}
        as='label'
        htmlFor='bio'
      >
        About
      </Text>
      <Box position='relative'>
        <Textarea
          className={mergeStyles([
            textAreaClassName(),
            customInputStyles(),
          ])}
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
