import { Content, Header, Wrapper } from './ui';
import { ErrorBoundary } from 'react-error-boundary';
import { Fragment, Suspense } from 'react';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  Loader,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  Paths,
  prefix,
} from '../../shared';
import { useParams } from 'react-router-dom';

function BookmarkPage() {
  const params = useParams();
  return (
    <Wrapper>
      <GQLRenderer
        ErrorFallback={ErrorFallback}
        LoadingFallback={<Loader loading={true} />}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense>
            <PageLayout>
              <PageLayoutHeader
                fallbackPath={prefix('/', Paths.bookmarks)}
              >
                {params.id ? (
                  <Header />
                ) : (
                  <Fragment>
                    <Head prefix='Bookmarks -' title='All Bookmarks' />
                    All Bookmarks
                  </Fragment>
                )}
              </PageLayoutHeader>
              <PageLayoutContent>
                <Content />
              </PageLayoutContent>
            </PageLayout>
          </Suspense>
        </ErrorBoundary>
      </GQLRenderer>
    </Wrapper>
  );
}
BookmarkPage.dipsplayName = 'Bookmark Page';

export default BookmarkPage;
