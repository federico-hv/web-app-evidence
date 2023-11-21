import { Box, Center, HStack, IconButton } from '@holdr-ui/react';
import {
  SliderControlsSCNames,
  SliderIndicatorProps,
  SliderProps,
  SliderSCNames,
} from './shared/types';
import { useEffect, useState } from 'react';
import {
  GenericProps,
  arrayFrom,
  getSubComponent,
  useCircularCount,
  useInterval,
} from 'shared';
import {
  FadeContent,
  IndicatorDot,
  SlideContent,
  SliderContextProvider,
  useSliderContext,
} from './shared';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';

function Slider({
  loop = true,
  autoplay = { active: true, delay: 10 },
  animation = 'fade',
  speed = 0.5,
  children,
}: SliderProps) {
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const elapsed = useInterval(autoplay?.delay || 20);

  const SlideList = getSubComponent<SliderSCNames>(
    children,
    'SliderSlide',
  );

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
  } = useCircularCount(SlideList?.length || 0);

  useEffect(() => {
    if (autoplay.active && elapsed != 0) {
      setDirection('right');
      incrementCurrent();
    }
  }, [elapsed]);

  if (!SlideList || !SlideList.length) return null;

  return (
    <SliderContextProvider
      value={{
        length: SlideList.length,
        incrementCurrent,
        decrementCurrent,
        setCurrent,
        current,
        loop,
        speed,
        animation,
        direction,
        setDirection,
        buttonClicked,
        setButtonClicked,
      }}
    >
      <Center position='relative' h='200px' w='full' overflow='hidden'>
        {animation === 'fade' && <FadeContent>{SlideList}</FadeContent>}
        {animation === 'slide' && <SlideContent>{SlideList}</SlideContent>}
        {controls}
        <Center position='absolute' b='0' l='0' r='0' pb={3}>
          {indicator}
        </Center>
      </Center>
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
  colorTheme = 'base100',
  style = { opacity: 0.75 },
  ...props
}: Partial<IconButtonProps>) {
  const {
    decrementCurrent,
    loop,
    current,
    setDirection,
    buttonClicked,
    setButtonClicked,
  } = useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!buttonClicked) {
          setButtonClicked(true);
          setDirection('left');
          decrementCurrent();
        }
      }}
      icon={icon}
      style={style}
      colorTheme={colorTheme}
      disabled={!loop && current === 0}
      {...props}
    />
  );
}

function SliderNextButton({
  icon = 'caret-right-outline',
  ariaLabel = 'go to next slide',
  colorTheme = 'base100',
  style = { opacity: 0.75 },
  ...props
}: Partial<IconButtonProps>) {
  const {
    incrementCurrent,
    loop,
    length,
    current,
    setDirection,
    buttonClicked,
    setButtonClicked,
  } = useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!buttonClicked) {
          setButtonClicked(true);
          setDirection('right');
          incrementCurrent();
        }
      }}
      icon={icon}
      style={style}
      colorTheme={colorTheme}
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
    <Box position='relative' radius={3} h='full' w='full'>
      {children}
    </Box>
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
