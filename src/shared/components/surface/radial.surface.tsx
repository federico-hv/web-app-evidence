import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { Box } from '@holdr-ui/react';

function RadialSurface({ css, children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%)',
        ...css,
      }}
    >
      {children}
    </Box>
  );
}
RadialSurface.displayName = 'RadialSurface';

export default RadialSurface;
