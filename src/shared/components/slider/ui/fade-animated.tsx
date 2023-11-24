import React, { Fragment } from 'react';
import { GenericProps } from '../../../interfaces';
import { Box, HStack } from '@holdr-ui/react';
import { useSliderContext } from '../shared';
import { MotionBox } from '../../../styles';
import { getSubComponent, makeArray } from '../../../utilities';
import { AnimatePresence } from 'framer-motion';
import { circular } from '../index';
import { useInterval } from '../../../hooks';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function FadeAnimated({ children }: GenericProps) {
  const { index, autoPlay, delay, numberOfSlides, updateIndex } =
    useSliderContext();

  const increment = () => updateIndex(circular(index + 1, numberOfSlides));
  const decrement = () => updateIndex(circular(index - 1, numberOfSlides));

  const FadeAnimatedSlides = getSubComponent(
    children,
    'FadeAnimatedSlides',
  );
  const FadeAnimatedControls = getSubComponent(
    children,
    'FadeAnimatedControls',
  );
  const ControlsWrapper = makeArray(FadeAnimatedControls)[0].props
    .children;

  const Percentage = 100 / numberOfSlides;

  // Add extra styling for slides
  const Slides = React.Children.map(
    makeArray(FadeAnimatedSlides)[0].props.children,
    (child, idx) => {
      const active = idx === index;
      return (
        <AnimatePresence>
          {active && (
            <MotionBox
              initial='hidden'
              variants={variants}
              animate='visible'
              transition={{ duration: 2.5, type: 'ease-in' }}
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
  // Add some superpowers to the buttons
  const Controls = React.Children.map(
    makeArray(ControlsWrapper)[0].props.children,
    (child) => {
      return React.Children.map(child, (child) => {
        if (
          child &&
          child.type &&
          child.type.displayName === 'SliderNextButton'
        ) {
          return <Box onClick={increment}>{child}</Box>;
        } else if (
          child &&
          child.type &&
          child.type.displayName === 'SliderPreviousButton'
        ) {
          return <Box onClick={decrement}>{child}</Box>;
        }
      });
    },
  );

  // autoplay effect
  useInterval(delay, () => {
    if (autoPlay) {
      increment();
    }
  });

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

FadeAnimatedSlides.displayName = 'FadeAnimatedSlides';
FadeAnimatedControls.displayName = 'FadeAnimatedControls';

FadeAnimated.Controls = FadeAnimatedControls;
FadeAnimated.Slides = FadeAnimatedSlides;

export default FadeAnimated;
