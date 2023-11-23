import { GenericProps, MotionBox } from 'shared';
import {
  DirectionNames,
  slideAnimateOut,
  slideAnimation,
  useSliderContext,
} from '../shared';
import {
  Children,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAnimate, useDragControls } from 'framer-motion';
import { Box, HStack } from '@holdr-ui/react';

function SlideSlider({ children }: GenericProps) {
  const {
    length,
    current: currentSlide,
    setCurrent,
    speed,
    buttonClicked,
    setButtonClicked,
  } = useSliderContext();
  const [displayedSlide, setDisplayedSlide] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const slideRef = useRef(null);

  const [SlideList, setSlideList] = useState(
    Children.map(children, (child, idx) => (
      <Fragment key={idx + 1}>{child}</Fragment>
    ))?.reduce(
      (slides: ReactElement[], slide: ReactElement, idx: number) => {
        const firstIndex = slides.length - Math.floor(length / 2);
        return idx + 1 <= length / 2
          ? [...slides, slide]
          : [
              ...slides.slice(0, firstIndex),
              slide,
              ...slides.slice(firstIndex),
            ];
      },
      [],
    ) || [],
  );

  useEffect(() => {
    if (displayedSlide === currentSlide || animationRunning) return;

    let difference = displayedSlide - currentSlide;
    let direction: DirectionNames = difference > 0 ? 'left' : 'right';

    setAnimationRunning(true);

    // no button has been clicked, since our difference is large
    if (!buttonClicked) {
      updateSlideList(direction, Math.abs(difference));
      setDisplayedSlide(currentSlide);
      setAnimationRunning(false);
      return;
    }

    // edge case
    if (Math.abs(difference) === length - 1) {
      difference = (-1 * difference) / (length - 1);
      direction = difference > 0 ? 'left' : 'right';
    }

    slideSlides(direction).then(() => {
      setDisplayedSlide(currentSlide);
      setAnimationRunning(false);
      setButtonClicked(false);
    });
  }, [currentSlide]);

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

  const slideSlides = async (direction: 'left' | 'right') => {
    await animate(scope.current, ...slideAnimation(direction, speed)).then(
      () => {
        updateSlideList(direction, 1);
        return animate(scope.current, ...slideAnimateOut());
      },
    );
  };

  const startDrag = () => {
    setAnimationRunning(true);
  };

  const endDrag = () => {
    // assumes transformX is the beginning of the transform style string
    const transformX = scope.current?.style?.transform.split(' ')[0];

    if (!transformX) return;
    // this assumes that the transformX property is in units of px, which seems to always be the case
    const sliderPosition: number = parseInt(
      transformX.substring(
        transformX.indexOf('(') + 1,
        transformX.indexOf('p'),
      ),
    );
    const difference = Math.round(sliderPosition / 1000);
    const index =
      currentSlide - difference > 0
        ? currentSlide - difference
        : length - difference;
    updateSlideList(
      difference > 0 ? 'left' : 'right',
      Math.abs(difference),
    );
    animate(scope.current, ...slideAnimateOut());
    setAnimationRunning(false);
    setCurrent(index);
    setDisplayedSlide(index);
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
          // broken, fix this
          l={`${-100 * Math.round(length / 2)}%`}
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

SlideSlider.displayName = 'SlideSlider';
export default SlideSlider;
