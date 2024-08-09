import {
  Box,
  hexToRGB,
  HStack,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@holdr-ui/react';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';
import { ReactNode } from 'react';

interface LabelProps {
  name: string;
  text: string;
  tooltip?: ReactNode;
  required?: boolean;
}

function Label({
  name,
  text,
  tooltip,
  required,
  ...props
}: LabelProps & TextProps) {
  // useful for rendering the tooltip in the right container - with correct z-index
  const node =
    document.getElementById('page-dialog-container') || document.body;

  return (
    <HStack
      color='white700'
      gap={required ? 2 : 1}
      items='center'
      css={{ marginBottom: text ? '$2' : 0 }}
    >
      <HStack css={{ gap: required ? '4px' : 0 }}>
        <Text size={2} weight={500} {...props} as='label' htmlFor={name}>
          {text}
        </Text>
        {required && <Box color='danger400'>*</Box>}
      </HStack>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger display='flex' css={{ alignItems: 'center' }}>
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
            // bgColor='#202032'
            // border={1}
            // borderColor={hexToRGB('#9898FF', 0.25)}
            css={{ padding: 0 }}
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </HStack>
  );
}
Label.displayName = 'Label';

export default Label;
