import { Children, useMemo } from 'react';
import { GenericProps, MotionBox } from 'shared';
import { useSliderContext } from '../shared';
import { AnimatePresence } from 'framer-motion';

function FadeSlider({ children }: GenericProps) {
  const { current, speed, setAnimationRunning } = useSliderContext();
  setAnimationRunning(false);

  const SlideList = useMemo(
    () =>
      Children.map(children, (slide) => {
        return (
          <MotionBox
            position='absolute'
            w='calc(100% - 32px)'
            h='full'
            radius={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: speed, type: 'ease-in' }}
          >
            {slide}
          </MotionBox>
        );
      }),
    [children],
  );

  if (!SlideList) return null;

  return (
    <AnimatePresence initial={false}>{SlideList[current]}</AnimatePresence>
  );
}

FadeSlider.displayName = 'FadeSlider';
export default FadeSlider;
