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
import { AnimationScope, useAnimate } from 'framer-motion';
import { MotionBox } from 'shared';
import { useFade, useSlide } from '../hooks';
import { DirectionNames } from '../types';

const useSliderAnimation: Record<
  string,
  (
    updateSlideList: (direction: DirectionNames, times: number) => void,
  ) => AnimationScope<any>
> = {
  fade: useFade,
  slide: useSlide,
};

export function SlideSlider({ children }: { children: ReactNode }) {
  const { length, animation } = useSliderContext();

  const [SlideList, setSlideList] = useState<ReactElement[]>(
    Children.map(children, (child, idx) => (
      <Fragment key={idx}>{child}</Fragment>
    ))?.reduce((slides, slide, idx) => {
      return idx <= length / 2 ? [...slides, slide] : [slide, ...slides];
    }, [] as ReactElement[]) || [],
  );

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

  const scope = useSliderAnimation[animation](updateSlideList);

  return (
    <Box
      w='calc(100% - 32px)'
      h='full'
      radius={3}
      overflow='hidden'
      position='relative'
    >
      <MotionBox
        h='full'
        w='full'
        ref={scope}
        // {...(animation === 'fade' && {
        //   initial: { opacity: 0 },
        //   animate: {
        //     opacity: 1,
        //     transition: { duration: speed, type: 'ease-in' },
        //   },
        //   exit: {
        //     opacity: 0,
        //     transition: { duration: speed, type: 'ease-in' },
        //   },
        // })}
      >
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

export default SlideSlider;
