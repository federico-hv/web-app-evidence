import { GenericProps } from '../../../shared';
import { Box, Circle } from '@holdr-ui/react';

function ButtonWrapper(props: GenericProps) {
  return (
    <Box
      h='100%'
      w='100%'
      css={{
        radius: '100%',
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background: 'rgba(133, 133, 255, 0.10)',
      }}
    >
      {props.children}
    </Box>
  );
}
ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
