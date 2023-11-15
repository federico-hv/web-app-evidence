import { Box, Center, HStack } from '@holdr-ui/react';
import {
  SliderControlsSCNames,
  SliderIndicatorProps,
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

function Slider({ children }: GenericProps) {
  const contentList =
    getSubComponent<SliderSCNames>(children, 'SliderContent') || [];

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
  } = useCircularCount(contentList.length);

  const elapsed = useInterval(10);

  useEffect(() => {
    if (elapsed != 0) incrementCurrent();
  }, [elapsed]);

  return (
    <SliderContextProvider
      value={{
        incrementCurrent,
        decrementCurrent,
        setCurrent,
        current,
        length: contentList.length,
      }}
    >
      <Box position='relative' w='full' h='200px'>
        <AnimatePresence>{contentList[current]}</AnimatePresence>
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
  ariaLabel = 'decrement slider',
  ...props
}: Partial<IconButtonProps>) {
  const { decrementCurrent } = useSliderContext();
  return (
    <SliderButton
      ariaLabel={ariaLabel}
      onClick={decrementCurrent}
      icon={icon}
      {...props}
    />
  );
}

function SliderNextButton({
  icon = 'caret-right-outline',
  ariaLabel = 'increment slider',
  ...props
}: Partial<IconButtonProps>) {
  const { incrementCurrent } = useSliderContext();
  return (
    <SliderButton
      ariaLabel={ariaLabel}
      onClick={incrementCurrent}
      icon={icon}
      {...props}
    />
  );
}

function SliderIndicator({
  renderFunction = IndicatorDot,
}: SliderIndicatorProps) {
  const { current, setCurrent, length } = useSliderContext();

  const steps = arrayFrom(length).map((idx) =>
    renderFunction(current === idx, idx, setCurrent),
  );

  return <HStack gap={3}>{steps}</HStack>;
}

function SliderContent({ children }: GenericProps) {
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
SliderContent.displayName = 'SliderContent';
SliderIndicator.displayName = 'SliderIndicator';
SliderControls.displayName = 'SliderControls';
SliderNextButton.displayName = 'SliderNextButton';
SliderPreviousButton.displayName = 'SliderPreviousButton';

Slider.Content = SliderContent;
Slider.Controls = SliderControls;
Slider.Indicator = SliderIndicator;
SliderControls.NextButton = SliderNextButton;
SliderControls.PreviousButton = SliderPreviousButton;

export default Slider;
export {
  SliderContent,
  SliderIndicator,
  SliderControls,
  SliderNextButton,
  SliderPreviousButton,
};
