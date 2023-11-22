import { useEffect } from 'react';
import { useSliderContext } from '../contexts';
import { DirectionNames } from '../types';
import { useAnimate } from 'framer-motion';
import { DialogTrigger } from '@holdr-ui/react/dist/compositions/dialog/src';

export function useSlide(
  updateSlideList: (direction: DirectionNames, times: number) => void,
  displayedSlide: number,
  setDisplayedSlide: (state: number) => void,
) {
  const {
    current: currentSlide,
    loading,
    setLoading,
    speed,
    buttonClicked,
    setButtonClicked,
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
    if (displayedSlide === currentSlide || loading) return;

    const difference = displayedSlide - currentSlide;
    const direction = difference > 0 ? 'left' : 'right';

    setLoading(true);
    if (!buttonClicked) {
      updateSlideList(direction, Math.abs(difference));
      setDisplayedSlide(currentSlide);
      setLoading(false);
      return;
    }

    slideSlides(direction).then(() => {
      setDisplayedSlide(currentSlide);
      setButtonClicked(false);
      setLoading(false);
    });
  }, [currentSlide]);

  return { scope, animate };
}
