import { Content, Header } from './ui';
import { Fragment } from 'react';
import { GQLRenderer, Head } from '../../shared';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@holdr-ui/react';

function BookmarkPage() {
  const params = useParams();

  return (
    <GQLRenderer>
      {params.id ? (
        <Header />
      ) : (
        <Fragment>
          <Head prefix='Bookmarks -' title='All Bookmarks' />
          <Box
            borderBottom={1}
            borderColor='rgba(152, 152, 255, 0.10)'
            p={4}
          >
            <Heading size={5} weight={400}>
              All Bookmarks
            </Heading>
          </Box>
        </Fragment>
      )}
      <Content />
    </GQLRenderer>
  );
}
BookmarkPage.displayName = 'BookmarkPage';

export default BookmarkPage;
