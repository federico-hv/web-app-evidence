import { AnimatePresence } from 'framer-motion';
import { Center, CircularProgress } from '@holdr-ui/react';
import { SpinnerLoaderProps } from './spinner-loader.types';
import { MotionBox } from 'shared';

function SpinnerLoader({
  children,
  loading,
  h = 150,
}: SpinnerLoaderProps) {
  return (
    <AnimatePresence>
      {!loading ? (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </MotionBox>
      ) : (
        <Center h={h}>
          <CircularProgress size={30} isIndeterminate />
        </Center>
      )}
    </AnimatePresence>
  );
}
SpinnerLoader.displayName = 'SpinnerLoader';

export default SpinnerLoader;
