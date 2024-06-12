import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { Box, Stack } from '@holdr-ui/react';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

function RadialSurface({ css, children, ...props }: StackProps) {
  return (
    <Stack
      direction='vertical'
      {...props}
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%)',
        ...css,
      }}
    >
      {children}
    </Stack>
  );
}
RadialSurface.displayName = 'RadialSurface';

export default RadialSurface;
