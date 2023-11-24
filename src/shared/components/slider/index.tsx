import { Box, HStack, IconButton } from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  arrayFrom,
  GenericProps,
  getSubComponent,
  useInterval,
} from 'shared';
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
} from './shared';
import { AnimatePresence } from 'framer-motion';

import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

export function circular(num: number, max: number) {
  if (num === max) return 0;
  else if (num === -1) return max - 1;
  return num;
}

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
  const elapsed = useInterval(autoplay?.delay || 20);

  const Slides = getSubComponent<SliderSCNames>(children, 'SliderSlide');

  const Controls = getSubComponent<SliderSCNames>(
    children,
    'SliderControls',
  );

  const Indicator = getSubComponent<SliderSCNames>(
    children,
    'SliderIndicator',
  );

  const numberOfSlides = Slides ? Slides.length : 0;

  return (
    <AnimatePresence>
      <SliderProvider loop={loop} numberOfSlides={numberOfSlides}>
        <Box
          position={position}
          h={h}
          w={w}
          overflow={overflow}
          {...props}
        >
          <HStack w='full' h='full' justify='flex-start'>
            {animation === 'slide' && (
              <SlideAnimated>
                <SlideAnimated.Slides>{Slides}</SlideAnimated.Slides>
                {numberOfSlides > 1 && (
                  <SlideAnimated.Controls>
                    {Controls}
                  </SlideAnimated.Controls>
                )}
                <SlideAnimated.Indicator>
                  {Indicator}
                </SlideAnimated.Indicator>
              </SlideAnimated>
            )}
            {animation === 'fade' && (
              <FadeAnimated>
                <FadeAnimated.Slides>{Slides}</FadeAnimated.Slides>
                {numberOfSlides > 1 && (
                  <FadeAnimated.Controls>{Controls}</FadeAnimated.Controls>
                )}
                {/*TODO: Add indicator here*/}
                {/*<SlideAnimated.Indicator>*/}
                {/*  {Indicator}*/}
                {/*</SlideAnimated.Indicator>*/}
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
  ...props
}: Partial<IconButtonProps>) {
  const { loop, index, numberOfSlides, updateIndex } = useSliderContext();

  if (index.current === 0 && !loop) {
    return <Fragment />;
  }

  return (
    <Box
      aria-label='previous-button'
      position='absolute'
      l='0.5rem'
      t='50%'
      zIndex={10}
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
  ...props
}: Partial<IconButtonProps>) {
  const { loop, index, updateIndex, numberOfSlides } = useSliderContext();

  if (index.current === numberOfSlides - 1 && !loop) {
    return <Fragment />;
  }

  return (
    <Box
      aria-label='next-button'
      position='absolute'
      r='0.5rem'
      t='50%'
      zIndex={10}
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
  const { numberOfSlides, updateIndex, index } = useSliderContext();

  const Steps = arrayFrom(numberOfSlides).map((idx) => {
    const key = `slider_indicator-item-${idx}`;
    const isActive = index.current === idx;
    const onClick = () => {
      updateIndex({ previous: index.current, current: idx });
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

function SliderSlide({
  children,
  h = 'full',
  w = 'full',
  flex = 1,
  position = 'relative',
  style = { pointerEvents: 'none' }, // What does this do?
  ...props
}: BoxProps) {
  return (
    <Box
      position={position}
      flex={flex}
      h={h}
      w={w}
      style={style}
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
