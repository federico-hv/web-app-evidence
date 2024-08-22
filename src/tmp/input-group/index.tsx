import {
  Box,
  Center,
  GeneralContextProvider,
  getSubComponent,
  Input as BaseInput,
  InputProps,
  useGeneralContext,
  useRecordState,
} from '@holdr-ui/react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import React, { memo, RefObject, useEffect, useRef } from 'react';

// use this as the basis for an input group
interface IInputGroupContext {
  inputRef: RefObject<HTMLInputElement> | null;
  leftElRef: RefObject<HTMLDivElement> | null;
  rightElRef: RefObject<HTMLDivElement> | null;
}

function InputGroup({ children }: BoxProps) {
  const [state, update] = useRecordState<IInputGroupContext>({
    inputRef: null,
    leftElRef: null,
    rightElRef: null,
  });

  const [initialPadding, updateInitialPadding] = useRecordState({
    start: 0,
    end: 0,
  });

  const LeftElement = getSubComponent(children, 'InputGroupLeftElement');
  const InputElement = getSubComponent(children, 'Input');
  const RightElement = getSubComponent(children, 'InputGroupRightElement');

  useEffect(() => {
    if (!state.inputRef || !state.inputRef.current) {
      return;
    }

    updateInitialPadding({
      start: parseInt(
        window.getComputedStyle(state.inputRef.current).paddingInlineStart,
      ),
      end: parseInt(
        window.getComputedStyle(state.inputRef.current).paddingInlineEnd,
      ),
    });

    if (state.rightElRef && state.rightElRef.current) {
      const elementWidth =
        state.rightElRef.current.getBoundingClientRect().width;

      const offsetWidth = state.rightElRef.current.offsetWidth;

      if (offsetWidth)
        state.inputRef.current.style.paddingInlineEnd = `${
          initialPadding.end + offsetWidth
        }px`;
      else
        state.inputRef.current.style.paddingInlineEnd = `${
          initialPadding.end + elementWidth
        }px`;
    }

    if (state.leftElRef && state.leftElRef.current) {
      const elementWidth =
        state.leftElRef.current.getBoundingClientRect().width;

      const offsetWidth = state.leftElRef.current.offsetWidth;

      if (offsetWidth)
        state.inputRef.current.style.paddingInlineStart = `${
          initialPadding.start + offsetWidth
        }px`;
      else
        state.inputRef.current.style.paddingInlineStart = `${
          initialPadding.start + elementWidth
        }px`;
    }

    return () => {
      if (state.inputRef && state.inputRef.current) {
        state.inputRef.current.style.paddingInlineStart = `${initialPadding.start}px`;
        state.inputRef.current.style.paddingInlineEnd = `${initialPadding.end}px`;
      }
    };
  }, [state]);
  return (
    <GeneralContextProvider value={{ state, update }}>
      <Box position='relative' w='100%'>
        {LeftElement}
        {InputElement}
        {RightElement}
      </Box>
    </GeneralContextProvider>
  );
}

function Input(props: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { update } = useGeneralContext<IInputGroupContext>();

  // no update means do not use the instantiated ref

  useEffect(() => {
    if (inputRef && inputRef.current) {
      update({ inputRef });
    }
  }, []);

  return <BaseInput {...props} innerRef={inputRef} />;
}
Input.displayName = 'Input';

const InputGroupLeftElement = memo(function ({ css, ...props }: BoxProps) {
  const leftElRef = useRef<HTMLDivElement>(null);
  const { update } = useGeneralContext<IInputGroupContext>();

  useEffect(() => {
    if (leftElRef && leftElRef.current) {
      update({ leftElRef });
    }
  }, [leftElRef.current]);

  return (
    <Center
      w='fit-content'
      css={{
        lineHeight: '115%',
        ...css,
      }}
      {...props}
      position='absolute'
      l='16px'
      t={0}
      b={0}
      innerRef={leftElRef}
    />
  );
});
InputGroupLeftElement.displayName = 'InputGroupLeftElement';

const InputGroupRightElement = memo(function ({
  css,
  ...props
}: BoxProps) {
  const rightElRef = useRef<HTMLDivElement>(null);
  const { update } = useGeneralContext<IInputGroupContext>();

  useEffect(() => {
    if (rightElRef && rightElRef.current) {
      update({ rightElRef });
    }
  }, []);

  return (
    <Center
      w='fit-content'
      css={{
        lineHeight: '115%',
        ...css,
      }}
      {...props}
      position='absolute'
      r='16px'
      t={0}
      b={0}
      innerRef={rightElRef}
    />
  );
});
InputGroupRightElement.displayName = 'InputGroupRightElement';

InputGroup.LeftElement = InputGroupLeftElement;
InputGroup.RightElement = InputGroupRightElement;
InputGroup.Input = Input;

export {
  InputGroup,
  InputGroupLeftElement,
  InputGroupRightElement,
  Input,
};
