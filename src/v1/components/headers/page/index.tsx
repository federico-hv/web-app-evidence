import { useLayoutEffect } from 'react';
import { useSwitch } from '@holdr-ui/react';
import { AnimatePresence } from 'framer-motion';
import { PageHeaderProps } from './page-header.types';
import { MotionWrapper } from '../../../shared';

function PageHeader({ children, appearAfter = 100 }: PageHeaderProps) {
  const { switchState, turnOn, turnOff } = useSwitch();

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= appearAfter) {
        turnOn();
      } else {
        turnOff();
      }
    });
  }, []);

  return (
    <AnimatePresence>
      {switchState && (
        <MotionWrapper
          position='sticky'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          h='100%'
          t={65}
          gap={3}
          py={4}
          px={6}
          zIndex={10}
          items='center'
          bgColor='clearTint400'
          borderBottom={2}
          borderColor='base100'
          css={{
            blur: '12px',
          }}
        >
          {children}
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
}
PageHeader.displayName = 'PageHeader';

export default PageHeader;
