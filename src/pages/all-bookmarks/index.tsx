import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, Loader } from '../../shared';
import { Suspense } from 'react';
import { Content, Header } from './ui';
import { Box } from '@holdr-ui/react';

function AllBookmarksPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader loading={true} />}>
        <Box
          w={{ '@bp4': '100%', '@bp5': 'calc(100% - 120px)' }}
          borderRight={2}
          borderLeft={2}
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
AllBookmarksPage.displayName = 'All Bookmarks Page';

export default AllBookmarksPage;
