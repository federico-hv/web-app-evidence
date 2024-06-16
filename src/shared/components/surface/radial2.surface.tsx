import { Stack } from '@holdr-ui/react';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

function RadialSurface2({ children, ...props }: StackProps) {
  return (
    <Stack
      direction='vertical'
      w='fit-content'
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%), linear-gradient(180deg, rgba(208, 208, 255, 0.08) 0%, rgba(208, 208, 255, 0.01) 100%)',
      }}
      {...props}
    >
      {children}
    </Stack>
  );
}
RadialSurface2.displayName = 'RadialSurface2';

export default RadialSurface2;
