import { AnimatePresence, motion } from 'framer-motion';
import { Box, Center, CircularProgress } from '@holdr-ui/react';
import { LoaderProps } from './types';

const MotionBox = motion(Box);

function Loader({
  children,
  loading,
  h = 'full',
  as = <CircularProgress size={30} isIndeterminate />,
}: LoaderProps) {
  return (
    <AnimatePresence>
      {!loading ? (
        <MotionBox
          h={h}
          w='100%'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </MotionBox>
      ) : (
        <Center h={h} w='100%'>
          {as}
        </Center>
      )}
    </AnimatePresence>
  );
}
Loader.displayName = 'Loader';

export default Loader;
