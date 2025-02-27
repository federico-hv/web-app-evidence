import { Box, Center, HStack, IconButton } from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  SliderControlsSCNames,
  SliderIndicatorProps,
  SliderProps,
  SliderSCNames,
  IndicatorDot,
  useSliderContext,
  SliderProvider,
  SlideAnimated,
  FadeAnimated,
  SliderButtonProps,
} from './shared';
import { AnimatePresence } from 'framer-motion';
import { CenterProps } from '@holdr-ui/react/dist/components/center/src/center.types';
import { arrayFrom, getSubComponent, makeArray } from '../../utilities';
import { GenericProps } from '../../interfaces';

export function circular(num: number, max: number) {
  if (num === max) return 0;
  else if (num === -1) return max - 1;
  return num;
}

function Slider({
  loop = false,
  autoPlay = false,
  keyboard = false,
  current = 0,
  delay = 2.5, // 2.5 seconds
  animation = 'fade',
  speed = 'duration-slower',
  position = 'relative',
  h = '200px',
  w = 'full',
  children,
  ...props
}: SliderProps) {
  const SliderContent = getSubComponent<SliderSCNames>(
    children,
    'SliderContent',
  );
  const Slides = getSubComponent<SliderSCNames>(
    makeArray(SliderContent)[0]?.props?.children,
    'SliderSlide',
  );

  const Controls = getSubComponent<SliderSCNames>(
    children,
    'SliderControls',
  );

  const Indicator = getSubComponent<SliderSCNames>(
    children,
    'SliderIndicator',
  );

  const numberOfSlides = Slides ? Slides.length : 0;

  if (numberOfSlides === 0) {
    return <Fragment />;
  }

  if (numberOfSlides === 1) {
    return (
      <Box position={position} h={h} w={w} {...props} overflow='hidden'>
        {Slides && Slides[0]}
      </Box>
    );
  }

  return (
    <AnimatePresence>
      <SliderProvider
        autoPlay={autoPlay}
        delay={delay}
        current={current}
        speed={speed}
        loop={loop}
        numberOfSlides={numberOfSlides}
        keyboard={keyboard}
      >
        <Box
          position={position}
          h={h}
          w={w}
          {...props}
          overflow='hidden'
          data-testid='slider'
        >
          <HStack w='full' h='full' justify='flex-start'>
            {animation === 'slide' && (
              <SlideAnimated>
                <SlideAnimated.Slides>{Slides}</SlideAnimated.Slides>
                <SlideAnimated.Controls>{Controls}</SlideAnimated.Controls>
                <SlideAnimated.Indicator>
                  {Indicator}
                </SlideAnimated.Indicator>
              </SlideAnimated>
            )}
            {animation === 'fade' && (
              <FadeAnimated>
                <FadeAnimated.Slides>{Slides}</FadeAnimated.Slides>
                <FadeAnimated.Controls>{Controls}</FadeAnimated.Controls>
                <FadeAnimated.Indicator>
                  {Indicator}
                </FadeAnimated.Indicator>
              </FadeAnimated>
            )}
          </HStack>
        </Box>
      </SliderProvider>
    </AnimatePresence>
  );
}

function SliderControls({ children }: GenericProps) {
  const NextButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderNextButton',
  );

  const PreviousButton = getSubComponent<SliderControlsSCNames>(
    children,
    'SliderPreviousButton',
  );

  return (
    <Fragment>
      {PreviousButton}
      {NextButton}
    </Fragment>
  );
}

function SliderPreviousButton({
  icon = 'caret-left-outline',
  ariaLabel = 'go to previous slide',
  colorTheme = 'clearTint400',
  zIndex = 10,
  ...props
}: SliderButtonProps) {
  const { loop, index } = useSliderContext();

  if (index === 0 && !loop) {
    return <Fragment />;
  }

  return (
    <Box
      aria-label='previous-button'
      position='absolute'
      l='0.5rem'
      t='50%'
      zIndex={zIndex}
      css={{ transform: 'translateY(-50%)' }}
    >
      <IconButton
        ariaLabel={ariaLabel}
        icon={icon}
        colorTheme={colorTheme}
        {...props}
      />
    </Box>
  );
}

function SliderNextButton({
  icon = 'caret-right-outline',
  ariaLabel = 'go to next slide',
  colorTheme = 'clearTint400',
  zIndex = 10,
  ...props
}: SliderButtonProps) {
  const { loop, index, numberOfSlides } = useSliderContext();

  if (index === numberOfSlides - 1 && !loop) {
    return <Fragment />;
  }

  return (
    <Box
      aria-label='next-button'
      position='absolute'
      r='0.5rem'
      t='50%'
      zIndex={zIndex}
      css={{ transform: 'translateY(-50%)' }}
    >
      <IconButton
        ariaLabel={ariaLabel}
        icon={icon}
        colorTheme={colorTheme}
        {...props}
      />
    </Box>
  );
}

function SliderIndicator({ renderItem, ...props }: SliderIndicatorProps) {
  const { numberOfSlides, setIndex, index } = useSliderContext();

  const Steps = arrayFrom(numberOfSlides).map((idx) => {
    const key = `slider_indicator-item-${idx}`;
    const isActive = index === idx;
    const onClick = () => {
      setIndex(idx);
    };

    return renderItem ? (
      renderItem(isActive, onClick, key)
    ) : (
      <IndicatorDot key={key} isActive={isActive} onClick={onClick} />
    );
  });

  return (
    <HStack
      position='absolute'
      b={0}
      l={0}
      r={0}
      items='center'
      justify='center'
      gap={3}
      {...props}
    >
      {Steps}
    </HStack>
  );
}

function SliderContent({ children }: GenericProps) {
  const Slides = getSubComponent<SliderSCNames>(children, 'SliderSlide');

  return <Fragment>{Slides}</Fragment>;
}

function SliderSlide({
  children,
  h = 'full',
  w = 'full',
  flex = 1,
  position = 'relative',
  ...props
}: CenterProps) {
  return (
    <Center position={position} flex={flex} h={h} w={w} {...props}>
      {children}
    </Center>
  );
}

Slider.displayName = 'Slider';
SliderSlide.displayName = 'SliderSlide';
SliderIndicator.displayName = 'SliderIndicator';
SliderControls.displayName = 'SliderControls';
SliderContent.displayName = 'SliderContent';
SliderNextButton.displayName = 'SliderNextButton';
SliderPreviousButton.displayName = 'SliderPreviousButton';

Slider.Slide = SliderSlide;
Slider.Controls = SliderControls;
Slider.Indicator = SliderIndicator;
Slider.Content = SliderContent;
SliderControls.NextButton = SliderNextButton;
SliderControls.PreviousButton = SliderPreviousButton;

export default Slider;
export {
  SliderSlide,
  SliderIndicator,
  SliderControls,
  SliderNextButton,
  SliderPreviousButton,
  SliderContent,
};
