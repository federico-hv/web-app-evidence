import { Box } from '@holdr-ui/react';
import { PopoverButtonProps } from './types';

function PopoverButton({
  children,
  onClick,
  disabled,
}: PopoverButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      <Box
        color='white500'
        cursor='pointer'
        radius='full'
        _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
        px={3}
        py={2}
        fontSize={{ '@bp1': 1, '@bp3': 1 }}
      >
        {children}
      </Box>
    </button>
  );
}

export default PopoverButton;
