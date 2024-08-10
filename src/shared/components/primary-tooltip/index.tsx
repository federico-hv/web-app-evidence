import { Box, hexToRGB } from '@holdr-ui/react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function PrimaryTooltip({
  text,
  ...props
}: { text: string } & Omit<BoxProps, 'children'>) {
  return (
    <Box
      bgColor='#202032'
      border={1}
      p={2}
      radius={1}
      w={300}
      borderColor={hexToRGB('#9898FF', 0.25)}
      {...props}
    >
      {text}
    </Box>
  );
}

export default PrimaryTooltip;
