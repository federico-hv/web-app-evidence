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
        color='base800'
        cursor='pointer'
        radius='full'
        _hover={{ backgroundColor: '$base100' }}
        p={3}
        fontSize={{ '@bp1': 1, '@bp3': 2 }}
      >
        {children}
      </Box>
    </button>
  );
}

export default PopoverButton;
