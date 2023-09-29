import { Box, Container, Stack, VStack } from '@holdr-ui/react';
import {
  Content,
  SocialsCard,
  RelationshipsCard,
  ReleasesCard,
  Controls,
  Header,
  Summary,
  Info,
} from './ui';
import {
  ErrorFallback,
  GQLRenderer,
  useScrollDirection,
} from '../../shared';
import { SuggestionsCard } from '../../features';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { ProfileProvider } from './shared/context';
import Relationships from './ui/relationships';

export function DisappearingHeader({
  hideOnScroll = true,
  sensitivity = 0,
  afterScrolling,
  children,
  ...props
}: StackProps & {
  hideOnScroll?: boolean;
  afterScrolling?: number;
  sensitivity?: number;
}) {
  const { direction, delta } = useScrollDirection('#root');

  console.log(delta < sensitivity, afterScrolling);

  return (
    <Box
      position='fixed'
      t={0}
      w='100%'
      bgColor='clearTint500'
      h={58}
      css={{
        blur: '12px',
        zIndex: 50,
        '@bp1': {
          display: hideOnScroll && direction === 'down' ? 'none' : 'block',
        },
        '@bp3': {
          display: 'none',
        },
      }}
    >
      <Stack h='100%' direction='horizontal' p={3} {...props}>
        {children}
      </Stack>
    </Box>
  );
}

function ProfilePage() {
  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <PageLayout>
              <PageLayoutHeader>
                <Container maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
                  <Header />
                </Container>
              </PageLayoutHeader>
              <PageLayoutContent>
                <Summary />
                <VStack w='100%' css={{ backgroundColor: '#FFF' }}>
                  <Controls />
                  <Info />
                  <Relationships />
                </VStack>
                <Box borderBottom={1} borderColor='base100' />
                <Content />
              </PageLayoutContent>
            </PageLayout>
          </ContentLayoutMain>
          <ContentLayoutAside>
            <VStack>
              <RelationshipsCard />
              <SocialsCard />
              <ReleasesCard />
              <SuggestionsCard />
            </VStack>
          </ContentLayoutAside>
        </ContentLayout>
      </ProfileProvider>
    </GQLRenderer>
  );
}

export default ProfilePage;
