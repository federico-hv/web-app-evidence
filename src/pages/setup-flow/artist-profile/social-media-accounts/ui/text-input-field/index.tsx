import {
  hexToRGB,
  HStack,
  Icon,
  Input,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  VStack,
} from '@holdr-ui/react';
import { customInputStyles } from '../../../../../../shared';
import { TextInputFieldProps } from './types';

function TextInputField({
  name,
  errorText,
  label,
  value,
  onChange,
  tooltip,
  placeholder,
}: TextInputFieldProps) {
  // useful for rendering the tooltip in the right container - with correct z-index
  const node =
    document.getElementById('profile-setup-content') || document.body;

  return (
    <VStack gap={1}>
      <VStack gap={2}>
        <HStack color='white700' gap={1} items='center'>
          <Text size={1} as='label' htmlFor={name}>
            {label}
          </Text>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger
                display='flex'
                css={{ alignItems: 'center' }}
              >
                <Icon name='information-outline' />
              </TooltipTrigger>

              <TooltipContent
                arrowWidth={0}
                arrowHeight={0}
                maxWidth={250}
                sideOffset={-16}
                side='right'
                align='start'
                fontSize={1}
                container={node}
                bgColor='#202032'
                border={1}
                borderColor={hexToRGB('#9898FF', 0.25)}
              >
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </HStack>
        <Input
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          radius={1}
          className={customInputStyles()}
          color='white500'
          placeholder={placeholder}
        />
      </VStack>
      {errorText && errorText.length && (
        <Text weight={500} color='danger400' as='sm' size={1}>
          {errorText}
        </Text>
      )}
    </VStack>
  );
}
TextInputField.displayName = 'TextInputField';

export default TextInputField;
