import { Box, Center, HStack } from '@holdr-ui/react';
import {
  SliderControlsSCNames,
  SliderIndicatorProps,
  SliderProps,
  SliderSCNames,
} from './shared/types';
import { useEffect } from 'react';
import {
  GenericProps,
  MotionBox,
  arrayFrom,
  getSubComponent,
  useCircularCount,
  useInterval,
} from 'shared';
import {
  IndicatorDot,
  SliderButton,
  SliderContextProvider,
  useSliderContext,
} from './shared';
import { AnimatePresence, color } from 'framer-motion';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';

function Slider({
  loop = true,
  delay = 10,
  autoplay = true,
  children,
}: SliderProps) {
  const SlideList =
    getSubComponent<SliderSCNames>(children, 'SliderSlide') || [];

  const controls = getSubComponent<SliderSCNames>(
    children,
    'SliderControls',
  );

  const indicator = getSubComponent<SliderSCNames>(
    children,
    'SliderIndicator',
  );

  const {
    incrementCount: incrementCurrent,
    decrementCount: decrementCurrent,
    setCount: setCurrent,
    count: current,
  } = useCircularCount(SlideList.length);

  const elapsed = useInterval(delay);

  useEffect(() => {
    if (autoplay && elapsed != 0) incrementCurrent();
  }, [elapsed]);

  return (
    <SliderContextProvider
      value={{
        incrementCurrent,
        decrementCurrent,
        setCurrent,
        current,
        loop: loop,
        length: SlideList.length,
      }}
    >
      <Box position='relative' w='full' h='200px'>
        <AnimatePresence>{SlideList[current]}</AnimatePresence>
        {controls}
        <Center position='absolute' b='0' l='0' r='0' pb={3}>
          {indicator}
        </Center>
      </Box>
    </SliderContextProvider>
  );
}

function SliderControls({
  position = 'absolute',
  t = '50%',
  b = '50%',
  w = 'full',
  justify = 'space-between',
  children,
  ...props
}: HStackProps) {
  const nextButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderNextButton',
  );

  const previousButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderPreviousButton',
  );

  return (
    <HStack
      items='center'
      position={position}
      t={t}
      b={b}
      w={w}
      justify={justify}
      {...props}
    >
      {previousButton}
      {nextButton}
    </HStack>
  );
}

function SliderPreviousButton({
  icon = 'caret-left-outline',
  ariaLabel = 'go to previous slide',
  ...props
}: Partial<IconButtonProps>) {
  const { decrementCurrent, loop, current } = useSliderContext();
  return (
    <SliderButton
      ariaLabel={ariaLabel}
      onClick={decrementCurrent}
      icon={icon}
      disabled={!loop && current === 0}
      {...props}
    />
  );
}

function SliderNextButton({
  icon = 'caret-right-outline',
  ariaLabel = 'go to next slide',
  ...props
}: Partial<IconButtonProps>) {
  const { incrementCurrent, loop, length, current } = useSliderContext();
  return (
    <SliderButton
      ariaLabel={ariaLabel}
      onClick={incrementCurrent}
      icon={icon}
      disabled={!loop && length - 1 === current}
      {...props}
    />
  );
}

function SliderIndicator({
  renderItem: renderFunction = (idx: number) => <IndicatorDot idx={idx} />,
  ...props
}: SliderIndicatorProps) {
  const { length } = useSliderContext();

  const Steps = arrayFrom(length).map((idx) => renderFunction(idx));

  return (
    <HStack gap={3} {...props}>
      {Steps}
    </HStack>
  );
}

function SliderSlide({ children }: GenericProps) {
  return (
    <Center>
      <MotionBox
        radius={3}
        overflow='hidden'
        w='calc(100% - 24px)'
        h='full'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25 } }}
      >
        {children}
      </MotionBox>
    </Center>
  );
}

Slider.displayName = 'Slider';
SliderSlide.displayName = 'SliderSlide';
SliderIndicator.displayName = 'SliderIndicator';
SliderControls.displayName = 'SliderControls';
SliderNextButton.displayName = 'SliderNextButton';
SliderPreviousButton.displayName = 'SliderPreviousButton';

Slider.Slide = SliderSlide;
Slider.Controls = SliderControls;
Slider.Indicator = SliderIndicator;
SliderControls.NextButton = SliderNextButton;
SliderControls.PreviousButton = SliderPreviousButton;

export default Slider;
export {
  SliderSlide,
  SliderIndicator,
  SliderControls,
  SliderNextButton,
  SliderPreviousButton,
};
