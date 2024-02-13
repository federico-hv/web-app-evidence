import { GenericProps } from '../../../shared';
import { Circle } from '@holdr-ui/react';

function ButtonWrapper(props: GenericProps) {
  return (
    <Circle
      size={32}
      border={1}
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background: 'rgba(133, 133, 255, 0.10)',
      }}
    >
      {props.children}
    </Circle>
  );
}
ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
