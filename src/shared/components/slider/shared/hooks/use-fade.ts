import { ReactElement, useEffect, useState } from 'react';
import { useSliderContext } from '../contexts';
import { DirectionNames } from '../types';
import { useAnimate } from 'framer-motion';

export function useFade(
  updateSlideList: (direction: DirectionNames, times: number) => void,
) {
  const {
    current: currentSlide,
    loading,
    setLoading,
    speed,
  } = useSliderContext();
  const [displayedSlide, setDisplayedSlide] = useState(0);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (displayedSlide === currentSlide || loading) return;

    setLoading(true);
    const difference = displayedSlide - currentSlide;

    animate(
      scope.current,
      {
        opacity: 0,
      },
      { duration: speed, ease: 'easeIn' },
    )
      .then(() => {
        updateSlideList(
          difference > 0 ? 'left' : 'right',
          Math.abs(difference),
        );

        return animate(
          scope.current,
          {
            opacity: 1,
          },
          { duration: speed, ease: 'easeIn' },
        );
      })
      .then(() => {
        setDisplayedSlide(currentSlide);
        setLoading(false);
      });

    return;
  }, [currentSlide]);

  return scope;
}
