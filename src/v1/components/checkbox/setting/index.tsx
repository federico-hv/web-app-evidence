import { Box, Checkbox, HStack, Text, VStack } from '@holdr-ui/react';
import { SettingCheckboxProp } from './setting-checkbox.type';

function SettingCheckbox({
  value,
  onChange,
  heading,
  subheading,
  disabled,
}: SettingCheckboxProp) {
  const id = `${heading}_Text_Title`;
  return (
    <HStack justify='space-between' items='center'>
      <VStack gap={1}>
        <Box
          css={{
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Text id={id}>{heading}</Text>
          {subheading && (
            <Text size={2} color='base400'>
              {subheading}
            </Text>
          )}
        </Box>
      </VStack>
      <Checkbox
        value={`${value}`}
        checked={value}
        onChange={onChange}
        disabled={disabled}
        labelledBy={id}
      />
    </HStack>
  );
}
SettingCheckbox.displayName = 'SettingCheckbox';

export default SettingCheckbox;
