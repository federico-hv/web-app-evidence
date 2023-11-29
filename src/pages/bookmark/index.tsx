import { Content, Header, Wrapper } from './ui';
import { Fragment } from 'react';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  Loader,
  Paths,
  prefix,
} from '../../shared';
import { useParams } from 'react-router-dom';
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';

function BookmarkPage() {
  const params = useParams();
  return (
    <Wrapper>
      <GQLRenderer
        ErrorFallback={ErrorFallback}
        LoadingFallback={<Loader loading={true} />}
      >
        <PageLayout>
          <PageLayoutHeader fallbackPath={prefix('/', Paths.bookmarks)}>
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
      </GQLRenderer>
    </Wrapper>
  );
}
BookmarkPage.dipsplayName = 'Bookmark Page';

export default BookmarkPage;
