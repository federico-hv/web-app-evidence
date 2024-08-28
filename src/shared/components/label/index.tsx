import {
  Box,
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
  node?: HTMLElement;
}

function Label({
  name,
  text,
  tooltip,
  required,
  node = document.getElementById('page-dialog-container') || document.body,
  ...props
}: LabelProps & TextProps) {
  // useful for rendering the tooltip in the right container - with correct z-index

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
            bgColor='transparent'
            css={{ padding: 0 }}
            container={node}
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
