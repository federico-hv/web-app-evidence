import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { Box } from '@holdr-ui/react';
import { createShimmer } from '../../styles';

function CustomSkeleton({ css, ...props }: BoxProps) {
  const animationName = createShimmer(
    'rgba(152, 152, 255, 0.05)',
    'rgba(152, 152, 255, 0.15)',
  );
  return (
    <Box
      css={{
        animation: `${animationName} 500ms linear infinite alternate`,
        ...css,
      }}
      h='100%'
      w='100%'
      {...props}
    />
  );
}

export default CustomSkeleton;
