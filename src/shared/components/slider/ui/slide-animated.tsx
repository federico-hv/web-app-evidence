import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSliderContext } from '../shared';
import { GenericProps } from '../../../interfaces';
import { getSubComponent, makeArray } from '../../../utilities';
import { circular } from '../index';
import { Box, HStack, useSwitch } from '@holdr-ui/react';
import { theme } from '../../../../configs';
import { useInterval } from '../../../hooks';

/*
Explanation:

This Slider uses the idea of adding the last item to the beginning of the list
and the first item to the end of the list. This is so that when we reach the
end of the list, we can remove animation and transition to the beginning of the list
creating the illusion that we have a continuous scroll sequence. The same is true
when we reach the beginning of the list.

Expo:

Given list: [A, ..., D]
Manipulated into: [D(2), A(1), ..., D(1), A(2)]

Note that (2) means copy and (1) means original

- When slider reaches A(2), animation is reset, and we change the slider to A(1).
- When slider reaches D(2), animation is reset, and we change the slider to D(1).

This allows us to create the illusion.

*/

/**
 *
 * Useful for SlideAnimated only.
 * @param idx
 * @param numOfItems
 */
function mappedIndex(idx: number, numOfItems: number) {
  if (idx === 0) return numOfItems - 1;
  else if (idx === numOfItems + 1) return 0;
  return idx - 1;
}

function SlideAnimated({ children }: GenericProps) {
  const SlideAnimatedSlides = getSubComponent(
    children,
    'SlideAnimatedSlides',
  );
  const SlideAnimatedControls = getSubComponent(
    children,
    'SlideAnimatedControls',
  );
  const SlideAnimatedIndicator = getSubComponent(
    children,
    'SlideAnimatedIndicator',
  );
  const ControlsWrapper = makeArray(SlideAnimatedControls)[0]?.props
    ?.children;

  const sliderRef = useRef<HTMLDivElement>(null);

  const { numberOfSlides, index, setIndex, speed, delay, autoPlay } =
    useSliderContext();

  // State used for handling user over-clicks: it disallows a user triggering another event
  // when the next or previous buttons are clicked.
  const [disabled, setDisabled] = useState(false);

  const {
    switchState: clickedIndicator,
    turnOn: allowSlideChange,
    turnOff: disallowSlideChange,
  } = useSwitch();

  // TODO: Use updated useCounter after merging
  const [currentIndex, setCurrentIndex] = useState(1);

  const newNumberOfSlides = numberOfSlides + 2;

  const Percentage = 100 / newNumberOfSlides;

  /**
   *
   * @param steps
   */
  const moveSlide = (steps: number) => {
    if (!sliderRef || !sliderRef.current) return;

    sliderRef.current.style.transform = `translateX(-${
      steps * Percentage
    }%)`;
  };

  const increment = (cb?: (num: number) => void) =>
    setCurrentIndex((prev) => {
      const next = circular(prev + 1, newNumberOfSlides);
      if (cb) cb(next);
      return next;
    });
  const decrement = (cb?: (num: number) => void) =>
    setCurrentIndex((prev) => {
      const next = circular(prev - 1, newNumberOfSlides);
      if (cb) cb(next);
      return next;
    });

  const addAnimation = () => {
    if (!sliderRef || !sliderRef.current) return;

    sliderRef.current.style.transition = `transform ${theme.transitions[speed]} ease-in-out`;
  };

  // Copy first item to end of slide and last item to start of slide
  const SlidesArr = makeArray(
    makeArray(SlideAnimatedSlides)[0].props.children,
  );
  let SlidesCopy = SlidesArr;

  if (SlidesArr.length > 1) {
    SlidesCopy = [
      SlidesArr[SlidesArr.length - 1],
      ...SlidesArr,
      SlidesArr[0],
    ];
  }

  // Add extra styling for slider:- used for layout of slider
  const Slides = React.Children.map(SlidesCopy, (child, idx) => (
    <Box
      key={`slide-${idx}`}
      w={`${Percentage}%`}
      css={{ flex: 1, flexShrink: 0, flexBasis: `${Percentage}%` }}
    >
      {child}
    </Box>
  ));

  // autoplay effect
  const { stop, start } = useInterval(delay, () => {
    if (autoPlay) {
      increment(moveSlide);
      addAnimation();
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
                if (disabled) return;
                stop();
                increment(moveSlide);
                addAnimation();
                setDisabled(true);
                start();
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
                if (disabled) return;
                stop();
                decrement(moveSlide);
                addAnimation();
                setDisabled(true);
                start();
              }}
            >
              {child}
            </Box>
          );
        }
      });
    },
  );

  // Slide to the slide when the indicators are clicked.
  useEffect(() => {
    if (clickedIndicator) {
      const next = index + 1;
      // update the current index
      setCurrentIndex(next);
      // animate
      moveSlide(next);
      addAnimation();
    }
    disallowSlideChange();
  }, [index]);

  // [On page load]: We need to move the slider to the "first" position
  // Note: Passed in list [first,...,last] -> actual list [last,first,...,last, first]
  useEffect(() => {
    if (!sliderRef || !sliderRef.current) return;

    sliderRef.current.style.transition = 'none'; // remove animation on load
    moveSlide(1);
    setTimeout(() => {
      // required so that transition only reset after transform has finished.
      if (!sliderRef || !sliderRef.current) return;
      sliderRef.current.style.transition = ''; // reset to initial animation.
    });
    return;
  }, []);

  return (
    <Fragment>
      <HStack
        h='100%'
        ref={sliderRef}
        w={`${newNumberOfSlides * 100}%`}
        onTransitionEnd={(e) => {
          if (currentIndex === 0) {
            // at the beginning, so reset and remove the transition
            e.currentTarget.style.transition = 'none';
            moveSlide(newNumberOfSlides - 2);
            setCurrentIndex(newNumberOfSlides - 2);
          } else if (currentIndex === newNumberOfSlides - 1) {
            // at the end, so reset and remove the transition
            e.currentTarget.style.transition = 'none';
            moveSlide(1);
            setCurrentIndex(1);
          }
          setTimeout(() => {
            // wait for all the stuff above to finish
            setDisabled(false);
          });
          // We are updating our external index here
          setIndex(mappedIndex(currentIndex, numberOfSlides));
        }}
        css={{
          flexShrink: 0,
        }}
      >
        {Slides}
      </HStack>
      {Controls}
      <Box onClick={allowSlideChange}>{SlideAnimatedIndicator}</Box>
    </Fragment>
  );
}

function SlideAnimatedSlides({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
function SlideAnimatedControls({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
function SlideAnimatedIndicator({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}

SlideAnimatedSlides.displayName = 'SlideAnimatedSlides';
SlideAnimatedControls.displayName = 'SlideAnimatedControls';
SlideAnimatedIndicator.displayName = 'SlideAnimatedIndicator';

SlideAnimated.Controls = SlideAnimatedControls;
SlideAnimated.Slides = SlideAnimatedSlides;
SlideAnimated.Indicator = SlideAnimatedIndicator;

export default SlideAnimated;
