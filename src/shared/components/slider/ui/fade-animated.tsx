import React, { Fragment, useEffect, useRef, useState } from 'react';
import { GenericProps } from '../../../interfaces';
import { Box, HStack, useKeyBind } from '@holdr-ui/react';
import { useSliderContext } from '../shared';
import { MotionBox } from '../../../styles';
import { getSubComponent, makeArray } from '../../../utilities';
import { AnimatePresence } from 'framer-motion';
import { circular } from '../index';
import { useInterval } from '../../../hooks';
import { theme } from 'configs';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function FadeAnimated({ children }: GenericProps) {
  const {
    index,
    autoPlay,
    delay,
    numberOfSlides,
    setIndex,
    speed,
    keyboard,
    loop,
  } = useSliderContext();

  const FadeAnimatedSlides = getSubComponent(
    children,
    'FadeAnimatedSlides',
  );
  const FadeAnimatedControls = getSubComponent(
    children,
    'FadeAnimatedControls',
  );
  const FadeAnimatedIndicator = getSubComponent(
    children,
    'FadeAnimatedIndicator',
  );
  const ControlsWrapper = makeArray(FadeAnimatedControls)[0]?.props
    ?.children;

  const Percentage = 100 / numberOfSlides;

  const incrementCircular = () =>
    setIndex((prev) => circular(prev + 1, numberOfSlides));
  const decrementCircular = () =>
    setIndex((prev) => circular(prev - 1, numberOfSlides));

  const incrementLinear = () => {
    setIndex((prev) => {
      if (prev === numberOfSlides - 1) return prev;
      return prev + 1;
    });
  };

  const decrementLinear = () => {
    setIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  const increment = loop ? incrementCircular : incrementLinear;
  const decrement = loop ? decrementCircular : decrementLinear;

  const updateSliderRight = () => {
    stopTimer();
    increment();
    startTimer();
  };

  const updateSliderLeft = () => {
    stopTimer();
    decrement();
    startTimer();
  };
  const keyIndex = useRef(index);

  useEffect(() => {
    keyIndex.current = index;
  }, [index]);

  // right arrow keybind
  useKeyBind(39, () => {
    if (!keyboard) return;
    if (loop || keyIndex.current != numberOfSlides - 1)
      updateSliderRight();
  });

  // left arrow keybind
  useKeyBind(37, () => {
    if (!keyboard) return;
    if (loop || keyIndex.current != 0) updateSliderLeft();
  });

  // Add extra styling for slides
  const Slides = React.Children.map(
    makeArray(FadeAnimatedSlides)[0].props.children,
    (child, idx) => {
      const active = idx === index;
      return (
        <AnimatePresence initial={false}>
          {active && (
            <MotionBox
              initial='hidden'
              variants={variants}
              animate='visible'
              transition={{
                duration: theme.transitions[speed],
                type: 'ease-in',
              }}
              position='absolute'
              t={0}
              l={0}
              h='full'
              w='full'
              css={{
                flex: 1,
                flexShrink: 0,
                flexBasis: `${Percentage}%`,
              }}
            >
              {child}
            </MotionBox>
          )}
        </AnimatePresence>
      );
    },
  );

  // autoplay effect
  const { stop: stopTimer, start: startTimer } = useInterval(delay, () => {
    if (autoPlay) {
      increment();
    }
  });

  // Add some superpowers to the buttons
  const Controls = React.Children.map(
    makeArray(ControlsWrapper)[0]?.props?.children,
    (child) => {
      return React.Children.map(child, (child) => {
        if (
          child &&
          child.type &&
          child.type.displayName === 'SliderNextButton'
        ) {
          return (
            <Box
              onClick={() => {
                stopTimer();
                increment();
                startTimer();
              }}
            >
              {child}
            </Box>
          );
        } else if (
          child &&
          child.type &&
          child.type.displayName === 'SliderPreviousButton'
        ) {
          return (
            <Box
              onClick={() => {
                stopTimer();
                decrement();
                startTimer();
              }}
            >
              {child}
            </Box>
          );
        }
      });
    },
  );

  return (
    <Fragment>
      <HStack
        h='100%'
        w={`${numberOfSlides * 100}%`}
        css={{
          flexShrink: 0,
        }}
      >
        {Slides}
      </HStack>
      {Controls}
      {FadeAnimatedIndicator}
    </Fragment>
  );
}
FadeAnimated.displayName = 'FadeAnimated';

function FadeAnimatedSlides({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
function FadeAnimatedControls({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}

function FadeAnimatedIndicator({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}

FadeAnimatedSlides.displayName = 'FadeAnimatedSlides';
FadeAnimatedControls.displayName = 'FadeAnimatedControls';
FadeAnimatedIndicator.displayName = 'FadeAnimatedIndicator';

FadeAnimated.Controls = FadeAnimatedControls;
FadeAnimated.Slides = FadeAnimatedSlides;
FadeAnimated.Indicator = FadeAnimatedIndicator;

export default FadeAnimated;
