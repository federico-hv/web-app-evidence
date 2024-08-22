import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@holdr-ui/react';

function InputLoadingIndicator({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <CircularProgress
          bgColor='base400'
          colorTheme='white500'
          thickness={2}
          isIndeterminate
          size={20}
        />
      )}
    </AnimatePresence>
  );
}
InputLoadingIndicator.displayName = 'InputLoadingIndicator';

export default InputLoadingIndicator;
