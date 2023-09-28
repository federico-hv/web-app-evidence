import { GenericProps } from '../../../shared';
import { Box } from '@holdr-ui/react';

function Wrapper({ children }: GenericProps) {
  return (
    <Box
      w={{ '@bp4': '100%', '@bp6': 'calc(100% - 120px)' }}
      borderRight={2}
      borderLeft={2}
      borderColor='base100'
      minHeight='100%'
    >
      {children}
    </Box>
  );
}
Wrapper.displayName = 'BookmarkPageWrapper';

export default Wrapper;
