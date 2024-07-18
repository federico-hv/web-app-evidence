import {
  Box,
  GenericProps,
  getSubComponent,
  HStack,
} from '@holdr-ui/react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

// use this as the basis for an input group

function InputGroup({
  children,
  border = 1,
  radius = 1,
  borderColor = 'rgba(152, 152, 255, 0.35)',
  bgColor = 'rgba(152, 152, 255, 0.15)',
  px = 3,
  css,
  ...props
}: BoxProps) {
  const LeftElement = getSubComponent(children, 'InputGroupLeftElement');
  const InputElement = getSubComponent(children, 'Input');
  const RightElement = getSubComponent(children, 'InputGroupRightElement');

  return (
    <Box position='relative' w='100%'>
      <HStack px={px} items='center'>
        {LeftElement}
        <Box
          flex={1}
          css={{
            '& > input:focus ~ *': {
              borderColor: 'rgba(152, 152, 255, 1)',
            },
          }}
        >
          {InputElement}
          <Box
            zIndex={-1}
            position='absolute'
            t={0}
            l={0}
            h='100%'
            w='100%'
            border={border}
            radius={radius}
            borderColor={borderColor}
            bgColor={bgColor}
            css={css}
          />
        </Box>
        {RightElement}
      </HStack>
    </Box>
  );
}

function InputGroupLeftElement(props: BoxProps) {
  return <Box {...props} />;
}
InputGroupLeftElement.displayName = 'InputGroupLeftElement';

function InputGroupRightElement(props: BoxProps) {
  return <Box {...props} />;
}
InputGroupRightElement.displayName = 'InputGroupRightElement';

InputGroup.LeftElement = InputGroupLeftElement;
InputGroup.RightElement = InputGroupRightElement;

export { InputGroup, InputGroupLeftElement, InputGroupRightElement };
