import { GenericProps } from '../../../shared';
import { Box } from '@holdr-ui/react';
import { forwardRef } from 'react';

function BaseButtonWrapper(props: GenericProps) {
  return (
    <Box
      css={{
        radius: '9999px',
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background: 'rgba(133, 133, 255, 0.10)',
      }}
    >
      {props.children}
    </Box>
  );
}

const ButtonWrapper = forwardRef<HTMLDivElement, GenericProps>(
  (props, ref) => <BaseButtonWrapper {...props} innerRef={ref} />,
);
ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
