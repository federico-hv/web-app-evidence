import {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useSliderContext } from '../contexts';
import { Box, HStack } from '@holdr-ui/react';
import { useAnimate } from 'framer-motion';
import { MotionBox } from 'shared';

export function SlideContent({ children }: { children: ReactNode }) {
  const {
    current: currentSlide,
    length,
    direction: directionClicked,
    speed,
    buttonClicked,
    setButtonClicked,
  } = useSliderContext();

  const [displayedSlide, setDisplayedSlide] = useState(0);

  const [scope, animate] = useAnimate();

  const [SlideList, setSlideList] = useState<ReactElement[]>(
    Children.map(children, (child, idx) => (
      <Fragment key={idx}>{child}</Fragment>
    ))?.reduce((slides, slide, idx) => {
      return idx <= length / 2 ? [...slides, slide] : [slide, ...slides];
    }, [] as ReactElement[]) || [],
  );

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

  const updateSlideList = (direction: 'left' | 'right', times: number) => {
    direction === 'left'
      ? setSlideList([
          ...SlideList.slice(length - times),
          ...SlideList.slice(0, length - times),
        ])
      : setSlideList([
          ...SlideList.slice(times),
          ...SlideList.slice(0, times),
        ]);
  };

  useEffect(() => {
    if (displayedSlide === currentSlide) return;

    if (!buttonClicked) {
      const difference = displayedSlide - currentSlide;
      updateSlideList(
        difference > 0 ? 'left' : 'right',
        Math.abs(difference),
      );
      setDisplayedSlide(currentSlide);
      return;
    }

    slideSlides(directionClicked).then(() => {
      setDisplayedSlide(currentSlide);
      setButtonClicked(false);
    });
  }, [currentSlide]);

  return (
    <Box
      w='calc(100% - 32px)'
      h='full'
      radius={3}
      overflow='hidden'
      position='relative'
    >
      <MotionBox h='full' w='full' ref={scope}>
        <HStack
          l={`${-100 * (length - 1 - length / 2)}%`}
          w={`${100 * length}%`}
          h='full'
          position='absolute'
        >
          {SlideList}
        </HStack>
      </MotionBox>
    </Box>
  );
}

export default SlideContent;
