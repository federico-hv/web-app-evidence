import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from 'layouts';
import { Head } from 'components';

function SupportPage() {
  return (
    <>
      <Head
        title='Support'
        description='Connect with our team and get a case started.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Support page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <VStack divider={<StackDivider />} gap={4}>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Artists
            </Heading>
          </VStack>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
SupportPage.displayName = 'SupportPage';
export default SupportPage;
