import { AnimatePresence } from 'framer-motion';
import { Center, CircularProgress } from '@holdr-ui/react';
import { LoaderProps } from './loader.types';
import { MotionBox } from '../../../shared';

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
