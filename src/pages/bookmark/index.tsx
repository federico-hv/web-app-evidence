import { Content, Header } from './ui';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { ErrorFallback } from '../../shared';
import { Box } from '@holdr-ui/react';

function BookmarkPage() {
  // const params = useParams();
  return (
    <Box
      w={{ '@bp4': '100%', '@bp5': 'calc(100% - 120px)' }}
      borderRight={2}
      borderLeft={2}
      borderColor='base100'
      minHeight='100%'
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense>
          <Header />
          <Content />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}
BookmarkPage.dipsplayName = 'Bookmark Page';

export default BookmarkPage;
