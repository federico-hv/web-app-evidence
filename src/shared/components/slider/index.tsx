import { Box, Center, HStack, IconButton } from '@holdr-ui/react';
import { Fragment, useEffect, useState } from 'react';
import {
  arrayFrom,
  getSubComponent,
  useCircularCount,
  useInterval,
} from 'shared';
import {
  IndicatorDot,
  InnerSlider,
  SliderContextProvider,
  useSliderContext,
  SliderControlsSCNames,
  SliderIndicatorProps,
  SliderProps,
  SliderSCNames,
} from './shared';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';
import { AnimatePresence } from 'framer-motion';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function Slider({
  loop = true,
  autoplay = { active: true, delay: 10 },
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
  const [loading, setLoading] = useState<boolean>(true);
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
    if (autoplay.active && elapsed != 0 && !loading) {
      setButtonClicked(true);
      incrementCurrent();
    }
  }, [elapsed]);

  if (!SlideList || !SlideList.length) return null;

  return (
    // does not solve render issue
    <AnimatePresence>
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
          buttonClicked,
          setButtonClicked,
          loading,
          setLoading,
        }}
      >
        <Center
          position={position}
          h={h}
          w={w}
          overflow={overflow}
          {...props}
        >
          <InnerSlider>{SlideList}</InnerSlider>
          {controls}
          <Center position='absolute' b='0' l='0' r='0' pb={3}>
            {indicator}
          </Center>
        </Center>
      </SliderContextProvider>
    </AnimatePresence>
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
  const { decrementCurrent, loop, current, loading, setButtonClicked } =
    useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!loading) {
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
}: IconButtonProps) {
  const {
    incrementCurrent,
    loop,
    length,
    current,
    loading,
    setButtonClicked,
  } = useSliderContext();
  return (
    <IconButton
      ariaLabel={ariaLabel}
      onClick={() => {
        if (!loading) {
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
  const { length, current, setCurrent, loading } = useSliderContext();

  const Steps = arrayFrom(length).map((idx) =>
    renderFunction(
      current === idx,
      () => {
        if (!loading) setCurrent(idx);
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
