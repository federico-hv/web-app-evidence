import { Content, Header } from './ui';
import { Wrapper } from '../bookmark/ui';

function AllBookmarksPage() {
  return (
    <Wrapper>
      <Header />
      <Content />
    </Wrapper>
  );
}
AllBookmarksPage.displayName = 'All Bookmarks Page';

export default AllBookmarksPage;
