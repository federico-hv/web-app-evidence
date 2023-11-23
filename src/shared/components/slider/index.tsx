import { Box, Center, HStack, IconButton } from '@holdr-ui/react';
import { Fragment, useEffect, useState } from 'react';
import {
  GenericProps,
  arrayFrom,
  getSubComponent,
  useCircularCount,
  useInterval,
} from 'shared';
import {
  SliderContextProvider,
  useSliderContext,
  SliderControlsSCNames,
  SliderIndicatorProps,
  SliderProps,
  SliderSCNames,
  SliderContentSCNames,
} from './shared';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { FadeSlider, IndicatorDot, SlideSlider } from './ui';

function Slider({
  loop = true,
  autoplay = false,
  delay = 20,
  animation = 'fade',
  speed = 0.5,
  position = 'relative',
  h = '200px',
  w = 'full',
  overflow = 'hidden',
  children,
  ...props
}: SliderProps) {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [animationRunning, setAnimationRunning] = useState(false);
  const elapsed = useInterval(delay);

  // can change, once getSubComponent does tree traversal
  const SliderContent = getSubComponent<SliderSCNames>(
    children,
    'SliderContent',
  );

  // can change, once getSubComponent does tree traversal
  const SliderSlides = SliderContent
    ? getSubComponent<SliderContentSCNames>(
        SliderContent[0]?.props?.children,
        'SliderSlide',
      )
    : [];

  const Controls = getSubComponent<SliderSCNames>(
    children,
    'SliderControls',
  );

  const Indicators = getSubComponent<SliderSCNames>(
    children,
    'SliderIndicator',
  );

  const length = SliderSlides?.length || 0;

  const {
    incrementCount: incrementCurrent,
    decrementCount: decrementCurrent,
    setCount: setCurrent,
    count: current,
  } = useCircularCount(length || 0);

  useEffect(() => {
    if (autoplay && elapsed != 0) {
      setButtonClicked(true);
      incrementCurrent();
    }
  }, [elapsed]);

  return (
    <SliderContextProvider
      value={{
        length: length,
        incrementCurrent,
        decrementCurrent,
        setCurrent,
        current,
        loop,
        speed,
        buttonClicked,
        setButtonClicked,
        animationRunning,
        setAnimationRunning,
      }}
    >
      <Center
        position={position}
        h={h}
        w={w}
        overflow={overflow}
        {...props}
      >
        {animation == 'fade' && <FadeSlider>{SliderSlides}</FadeSlider>}
        {animation == 'slide' && <SlideSlider>{SliderSlides}</SlideSlider>}
        {Controls}
        <Center position='absolute' b='0' l='0' r='0' pb={3}>
          {Indicators}
        </Center>
      </Center>
    </SliderContextProvider>
  );
}

function SliderControls({ children, ...props }: BoxProps) {
  const nextButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderNextButton',
  );

  const previousButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderPreviousButton',
  );

  return (
    <Fragment>
      <Box
        position='absolute'
        l={0}
        t='50%'
        css={{ transform: 'translateY(-50%)' }}
        {...props}
      >
        {previousButton}
      </Box>
      <Box
        position='absolute'
        r={0}
        t='50%'
        css={{ transform: 'translateY(-50%)' }}
        {...props}
      >
        {nextButton}
      </Box>
    </Fragment>
  );
}

function SliderPreviousButton({
  icon = 'caret-left-outline',
  ariaLabel = 'go to previous slide',
  colorTheme = 'primary400',
  ...props
}: Partial<IconButtonProps>) {
  const {
    decrementCurrent,
    loop,
    current,
    setButtonClicked,
    animationRunning,
    setAnimationRunning,
  } = useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!animationRunning) {
          setAnimationRunning(true);
          setButtonClicked(true);
          decrementCurrent();
        }
      }}
      icon={icon}
      style={{ opacity: 0.75 }}
      colorTheme={colorTheme}
      disabled={!loop && current === 0}
      {...props}
    />
  );
}

function SliderNextButton({
  icon = 'caret-right-outline',
  ariaLabel = 'go to next slide',
  colorTheme = 'primary400',
  ...props
}: Partial<IconButtonProps>) {
  const {
    incrementCurrent,
    loop,
    length,
    current,
    setButtonClicked,
    animationRunning,
    setAnimationRunning,
  } = useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!animationRunning) {
          setAnimationRunning(true);
          setButtonClicked(true);
          incrementCurrent();
        }
      }}
      icon={icon}
      style={{ opacity: 0.75 }}
      colorTheme={colorTheme}
      disabled={!loop && length - 1 === current}
      {...props}
    />
  );
}

function SliderIndicator({
  renderItem: renderFunction = (isActive, onClick, key) => (
    <IndicatorDot isActive={isActive} onClick={onClick} key={key} />
  ),
  ...props
}: SliderIndicatorProps) {
  const {
    length,
    current,
    setCurrent,
    animationRunning,
    setAnimationRunning,
  } = useSliderContext();

  const Steps = arrayFrom(length).map((idx) =>
    renderFunction(
      current === idx,
      () => {
        if (!animationRunning) {
          setAnimationRunning(true);
          setCurrent(idx);
        }
      },
      `slider_indicator-item-${idx}`,
    ),
  );

  return (
    <HStack gap={3} {...props}>
      {Steps}
    </HStack>
  );
}

function SliderContent({ children }: GenericProps) {
  return <>{children}</>;
}

function SliderSlide({
  children,
  h = 'full',
  w = 'full',
  radius = 3,
  position = 'relative',
  css = { pointerEvents: 'none' },
  ...props
}: BoxProps) {
  return (
    <Box
      position={position}
      radius={radius}
      h={h}
      w={w}
      css={css}
      {...props}
    >
      {children}
    </Box>
  );
}

Slider.displayName = 'Slider';
SliderSlide.displayName = 'SliderSlide';
SliderContent.displayName = 'SliderContent';
SliderIndicator.displayName = 'SliderIndicator';
SliderControls.displayName = 'SliderControls';
SliderNextButton.displayName = 'SliderNextButton';
SliderPreviousButton.displayName = 'SliderPreviousButton';

Slider.Content = SliderContent;
Slider.Slide = SliderSlide;
Slider.Controls = SliderControls;
Slider.Indicator = SliderIndicator;
SliderControls.NextButton = SliderNextButton;
SliderControls.PreviousButton = SliderPreviousButton;

export default Slider;
export {
  SliderSlide,
  SliderContent,
  SliderIndicator,
  SliderControls,
  SliderNextButton,
  SliderPreviousButton,
};
