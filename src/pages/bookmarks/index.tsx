import { Box } from '@holdr-ui/react';
import {
  Head,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  Paths,
  ShelfLayout,
  ShelfLayoutShelf,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function BookmarksPage() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate(`/${Paths.bookmarks}/all`);
    }
  }, []);

  return (
    <Box>
      <Head title='Bookmarks' description='' />
      <ShelfLayout>
        <ShelfLayoutShelf
          as='aside'
          h='100%'
          w={{
            '@bp4': 300,
            '@bp5': 350,
          }}
          borderRight={2}
          borderColor='base100'
          css={{
            flexShrink: 0,
          }}
        >
          <PageLayout>
            <PageLayoutHeader>Bookmarks</PageLayoutHeader>
            <PageLayoutContent>
              <TextGroup p={4} borderBottom={2} borderColor='base100'>
                <TextGroupHeading as='h3' size={3}>
                  Bookmark Name
                </TextGroupHeading>
                <TextGroupSubheading size={2} color='base300' weight={500}>
                  0 posts
                </TextGroupSubheading>
              </TextGroup>
            </PageLayoutContent>
          </PageLayout>
        </ShelfLayoutShelf>
        <ShelfLayoutShelf w='100%' role='contentinfo'>
          <Outlet />
        </ShelfLayoutShelf>
      </ShelfLayout>
    </Box>
  );
}
BookmarksPage.displayName = 'Bookmarks Page';

export default BookmarksPage;
