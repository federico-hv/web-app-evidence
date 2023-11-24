import { GenericProps, MotionBox } from 'shared';
import {
  DirectionNames,
  slideAnimateOut,
  slideAnimation,
  useCircularArray,
  useSliderContext,
} from '../shared';
import {
  Children,
  PointerEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  useAnimate,
  useDragControls,
} from 'framer-motion';
import { Box, HStack } from '@holdr-ui/react';

function SlideSlider({ children }: GenericProps) {
  const {
    length,
    current: currentSlide,
    setCurrent,
    speed,
    buttonClicked,
    setButtonClicked,
    setAnimationRunning,
  } = useSliderContext();
  const controls = useDragControls();
  const [displayedSlide, setDisplayedSlide] = useState(0);
  const [scope, animate] = useAnimate();
  const slideRef = useRef(null);

  const { array: SlideList, slideArray: updateSlideList } =
    useCircularArray(Children.toArray(children));

  useEffect(() => {
    if (displayedSlide === currentSlide) return;

    let difference = displayedSlide - currentSlide;
    let direction: DirectionNames = difference > 0 ? 'left' : 'right';

    // no button has been clicked, since our difference is large
    // animation will be skipped
    if (!buttonClicked) {
      updateSlideList(direction, Math.abs(difference));
      setDisplayedSlide(currentSlide);
      setAnimationRunning(false);
      return;
    }

    // loop around case
    if (Math.abs(difference) === length - 1) {
      difference = (-1 * difference) / (length - 1);
      direction = difference > 0 ? 'left' : 'right';
    }

    slideSlides(direction).then(() => {
      setDisplayedSlide(currentSlide);
      setButtonClicked(false);
      setAnimationRunning(false);
    });
  }, [currentSlide]);

  // sliding animation
  const slideSlides = async (direction: 'left' | 'right') => {
    await animate(scope.current, ...slideAnimation(direction, speed)).then(
      () => {
        updateSlideList(direction, 1);
        return animate(scope.current, ...slideAnimateOut());
      },
    );
  };

  const startDrag = (event: PointerEvent) => {
    setAnimationRunning(true);
    controls.start(event);
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
    const difference = Math.round(
      sliderPosition / scope.current.offsetWidth,
    );

    if (
      difference > length / 2 || // left boundary
      difference < -1 * Math.ceil(length / 2) // right boundary
    ) {
      setAnimationRunning(false);
      animate(scope.current, ...slideAnimateOut());
      return;
    }
    const index =
      currentSlide - difference >= 0
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
    <AnimatePresence initial={false} mode='wait'>
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
          dragMomentum={false}
          onDragEnd={endDrag}
        >
          <HStack
            ref={slideRef}
            l={`${-100 * Math.round(length / 2)}%`}
            w={`${100 * length}%`}
            h='full'
            position='absolute'
          >
            {SlideList}
          </HStack>
        </MotionBox>
      </Box>
    </AnimatePresence>
  );
}

SlideSlider.displayName = 'SlideSlider';
export default SlideSlider;
