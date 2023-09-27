import {
  ErrorFallback,
  GenericProps,
  GQLRenderer,
  Loader,
} from '../../../shared';
import { Box } from '@holdr-ui/react';

function Wrapper({ children }: GenericProps) {
  return (
    <Box
      w={{ '@bp4': '100%', '@bp5': 'calc(100% - 120px)' }}
      borderRight={2}
      borderLeft={2}
      borderColor='base100'
      minHeight='100%'
    >
      <GQLRenderer
        ErrorFallback={ErrorFallback}
        LoadingFallback={<Loader loading={true} />}
      >
        {children}
      </GQLRenderer>
    </Box>
  );
}
Wrapper.displayName = 'BookmarkPageWrapper';

export default Wrapper;
