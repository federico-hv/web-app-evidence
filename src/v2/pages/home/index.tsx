import {
  ContentBox,
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../shared';
import { Box } from '@holdr-ui/react';

function HomePage() {
  return (
    <ContentLayout>
      <ContentLayoutMain>
        <Box p={2}>
          <ContentBox>Nothing to display</ContentBox>
        </Box>
      </ContentLayoutMain>
      <ContentLayoutAside></ContentLayoutAside>
    </ContentLayout>
  );
}
HomePage.displayName = 'HomePage';

export default HomePage;
