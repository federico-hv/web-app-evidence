import { GenericProps } from '../../interfaces';
import { Box } from '@holdr-ui/react';

function TabBorderFix({ children }: GenericProps) {
  return (
    <Box
      css={{
        '& div:nth-child(2)': {
          borderColor: '$base100',
        },
      }}
    >
      {children}
    </Box>
  );
}
TabBorderFix.displayName = 'TabBorderFix';

export default TabBorderFix;
