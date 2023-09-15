import { Content, Header } from './ui';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { ErrorFallback } from '../../shared';
import { Box } from '@holdr-ui/react';

function BookmarkPage() {
  // const params = useParams();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense>
        <Box
          w={{ '@bp4': '100%', '@bp5': 'calc(100% - 120px)' }}
          borderRight={2}
          borderColor='base100'
          minHeight='100%'
        >
          <Header />
          <Content />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
}
BookmarkPage.dipsplayName = 'Bookmark Page';

export default BookmarkPage;
