import { AnimatePresence } from 'framer-motion';
import { Children, ReactNode, useMemo } from 'react';
import { MotionBox } from 'shared';
import { useSliderContext } from '../contexts';

export function FadeContent({ children }: { children: ReactNode }) {
  const { current, speed } = useSliderContext();

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
            animate={{
              opacity: 1,
              transition: { duration: speed, type: 'ease-in' },
            }}
            exit={{
              opacity: 0,
              transition: { duration: speed, type: 'ease-in' },
            }}
          >
            {slide}
          </MotionBox>
        );
      }),
    [children],
  );

  if (!SlideList) return null;

  return <AnimatePresence>{SlideList[current]}</AnimatePresence>;
}

export default FadeContent;
