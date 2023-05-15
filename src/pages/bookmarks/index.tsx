import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head } from '../../components';

function BookmarksPage() {
  return (
    <>
      <Head
        title='Channels'
        description='Tap back into all the stuff that you saved earlier and found interesting.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Bookmarks page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <VStack divider={<StackDivider />} gap={4}>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Artists
            </Heading>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Channels
            </Heading>
          </VStack>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
BookmarksPage.displayName = 'BookmarksPage';
export default BookmarksPage;
