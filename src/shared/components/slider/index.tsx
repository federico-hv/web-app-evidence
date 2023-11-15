import { Box, ButtonGroup, Center, IconButton } from '@holdr-ui/react';
import { SliderContentProps, SliderSCNames } from './shared/types';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { MotionBox, getSubComponent } from 'shared';
import { SliderButtons, SliderIndicator } from './ui';
import { useSlider, useTimer } from './shared';

function Slider({ children }: { children?: ReactNode }) {
  const { elapsed } = useTimer(10000);
  const contentList =
    getSubComponent<SliderSCNames>(children, 'SliderContent') || [];

  const { incrementCurrent, decrementCurrent, setCurrent, current } =
    useSlider(contentList.length);

  useEffect(() => {
    if (elapsed != 0) incrementCurrent();
  }, [elapsed]);

  return (
    <Box position='relative' w='full'>
      <Center>{contentList[current]}</Center>
      <SliderButtons
        incrementCurrent={incrementCurrent}
        decrementCurrent={decrementCurrent}
      />
      <Center position='absolute' b='0' l='0' r='0' pb={3}>
        <SliderIndicator
          length={contentList.length}
          setCurrent={setCurrent}
          current={current}
        />
      </Center>
    </Box>
  );
}

function SliderContent({ children, onClick }: SliderContentProps) {
  return (
    <MotionBox
      radius={3}
      overflow='hidden'
      w='calc(100% - 40px)'
      h='full'
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      {children}
    </MotionBox>
  );
}

Slider.displayName = 'Slider';
SliderContent.displayName = 'SliderContent';

Slider.Content = SliderContent;

export default Slider;
export { SliderContent };
