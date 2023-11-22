import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSliderContext } from '../contexts';
import { Box, HStack } from '@holdr-ui/react';
import { AnimationScope, useDragControls } from 'framer-motion';
import { MotionBox } from 'shared';
import { useFade, useSlide } from '../hooks';
import { DirectionNames } from '../types';

const useSliderAnimation: Record<
  string,
  (
    updateSlideList: (direction: DirectionNames, times: number) => void,
    displayedSlide: number,
    setDisplayedSlide: (state: number) => void,
  ) => { scope: AnimationScope<any>; animate: any }
> = {
  fade: useFade,
  slide: useSlide,
};

export function InnerSlider({ children }: { children: ReactNode }) {
  const { length, animation, setLoading } = useSliderContext();
  const [displayedSlide, setDisplayedSlide] = useState(0);
  const controls = useDragControls();
  const slideRef = useRef(null);

  const [SlideList, setSlideList] = useState<ReactElement[]>(
    Children.map(children, (child, idx) => {
      if (isValidElement<{ idx: number }>(child))
        return cloneElement(child, { idx: idx });
    })?.reduce((slides, slide, idx) => {
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

  useEffect(() => {
    setLoading(false);
  }, []);

  const { scope, animate } = useSliderAnimation[animation](
    updateSlideList,
    displayedSlide,
    setDisplayedSlide,
  );

  const startDrag = () => {
    setLoading(true);
  };

  const endDrag = () => {
    const transformX = scope.current.style.transform.split(' ')[0];

    // this assumes that the transformX property is in units of px, which seems to always be the case
    const sliderPosition: number = transformX.substring(
      transformX.indexOf('(') + 1,
      transformX.indexOf('p'),
    );
    console.log(sliderPosition);
    console.log(Math.round(sliderPosition / scope.current.offsetWidth));
  };

  return (
    <Box
      w='calc(100% - 32px)'
      h='full'
      radius={3}
      overflow='hidden'
      position='relative'
      onPointerDown={startDrag}
    >
      <MotionBox
        h='full'
        w='full'
        ref={scope}
        drag='x'
        dragControls={controls}
        dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
        onDragEnd={endDrag}
      >
        <HStack
          ref={slideRef}
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

export default InnerSlider;
