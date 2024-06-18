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
import { InputTextFieldProps } from './types';
import { customInputStyles } from '../../styles';

function InputTextField({
  name,
  errorText,
  label,
  value,
  onChange,
  tooltip,
  placeholder,
  ...props
}: InputTextFieldProps) {
  // useful for rendering the tooltip in the right container - with correct z-index
  const node =
    document.getElementById('page-dialog-container') || document.body;

  return (
    <VStack gap={1} flex={1}>
      <VStack>
        <HStack
          color='white700'
          gap={1}
          items='center'
          css={{ marginBottom: '$2' }}
        >
          {label && (
            <Text size={2} weight={500} as='label' htmlFor={name}>
              {label}
            </Text>
          )}
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
          {...props}
        />
      </VStack>
      {errorText && errorText.length && (
        <Text
          weight={500}
          color='danger400'
          size={1}
          css={{ marginTop: '$2' }}
        >
          {errorText}
        </Text>
      )}
    </VStack>
  );
}
InputTextField.displayName = 'TextField';

export default InputTextField;
