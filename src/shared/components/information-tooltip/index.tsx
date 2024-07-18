import {
  hexToRGB,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@holdr-ui/react';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';
import { ResponsiveValue, Size } from '@holdr-ui/react/dist/shared';

interface InformationTooltipProps {
  description: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'start' | 'end';
  sideOffset?: number;
  container?: HTMLElement;
  color?: ThemeColor;
  size?: ResponsiveValue<'xs' | Size | 'inherit'>;
}

function InformationTooltip({
  color,
  size,
  description,
  side = 'top',
  align = 'center',
  sideOffset = -16,
  container,
}: InformationTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger display='flex' css={{ alignItems: 'center' }}>
        <Icon size={size} color={color} name='information-outline' />
      </TooltipTrigger>

      <TooltipContent
        color='white500'
        arrowWidth={0}
        arrowHeight={0}
        maxWidth={250}
        sideOffset={sideOffset}
        side={side}
        align={align}
        container={container}
        fontSize={1}
        bgColor='#202032'
        border={1}
        borderColor={hexToRGB('#9898FF', 0.25)}
      >
        {description}
      </TooltipContent>
    </Tooltip>
  );
}
InformationTooltip.displayName = 'InformationTooltip';

export default InformationTooltip;
