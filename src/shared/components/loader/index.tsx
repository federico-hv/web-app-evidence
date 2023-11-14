import { AnimatePresence, motion } from 'framer-motion';
import { Box, Center, CircularProgress } from '@holdr-ui/react';
import { LoaderProps } from './types';

const MotionBox = motion(Box);

function Loader({
  children,
  loading,
  h = 150,
  as = <CircularProgress size={30} isIndeterminate />,
}: LoaderProps) {
  return (
    <AnimatePresence>
      {!loading ? (
        <MotionBox
          h='100%'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </MotionBox>
      ) : (
        <Center h={h}>{as}</Center>
      )}
    </AnimatePresence>
  );
}
Loader.displayName = 'Loader';

export default Loader;
