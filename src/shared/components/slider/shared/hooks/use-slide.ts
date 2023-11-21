import { ReactElement, useEffect, useState } from 'react';
import { useSliderContext } from '../contexts';
import { DirectionNames } from '../types';
import { useAnimate } from 'framer-motion';

export function useSlide(
  updateSlideList: (direction: DirectionNames, times: number) => void,
  displayedSlide: number,
  setDisplayedSlide: (state: number) => void,
) {
  const {
    current: currentSlide,
    direction: directionClicked,
    loading,
    setLoading,
    speed,
    buttonClicked,
    setButtonClicked,
    drag,
  } = useSliderContext();

  const [scope, animate] = useAnimate();

  const slideSlides = async (direction: 'left' | 'right') => {
    await animate(
      scope.current,
      {
        x: direction === 'left' ? '100%' : '-100%',
      },
      {
        ease: 'easeIn',
        duration: speed,
      },
    ).then(() => {
      updateSlideList(direction, 1);

      return animate(
        scope.current,
        {
          x: '0',
        },
        {
          duration: 0,
        },
      );
    });
  };

  useEffect(() => {
    if (displayedSlide === currentSlide || loading || drag) return;

    setLoading(true);
    if (!buttonClicked) {
      const difference = displayedSlide - currentSlide;

      updateSlideList(
        difference > 0 ? 'left' : 'right',
        Math.abs(difference),
      );

      setDisplayedSlide(currentSlide);
      setLoading(false);
      return;
    }

    slideSlides(directionClicked).then(() => {
      setDisplayedSlide(currentSlide);
      setButtonClicked(false);
      setLoading(false);
    });
  }, [currentSlide]);

  return { scope, animate };
}
