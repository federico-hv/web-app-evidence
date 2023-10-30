import { Box, Container, useWindowSize, VStack } from '@holdr-ui/react';
import {
  GenericProps,
  GQLRenderer,
  Head,
  NotFoundError,
  useGeneralContext,
  useScrollPosition,
} from '../../shared';
import { IProfile, ProfileProvider } from './shared';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { RelationshipProvider, SuggestionsCard } from '../../features';
import {
  DetailsHeader,
  InfoGroup,
  ProfileActionsGroup,
  ProfileContent,
  RelationshipsCard,
  RelationshipsGroup,
  ReleasesCard,
  SocialsCard,
  TitleHeader,
} from './ui';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function CustomPageLayoutHeader({
  children,
  appearAfter,
}: GenericProps & { appearAfter: number }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const ref = useRef<HTMLDivElement>();
  const { top } = useScrollPosition();
  const { width } = useWindowSize();

  useEffect(() => {
    if (ref && ref.current) setContainerWidth(ref.current.clientWidth);
  }, [width]);

  return (
    <AnimatePresence>
      <Box innerRef={ref} w='100%' h={0} aria-hidden={false} />
      {top >= appearAfter && (
        <PageLayoutHeader zIndex={10} position='fixed' w={containerWidth}>
          {children}
        </PageLayoutHeader>
      )}
    </AnimatePresence>
  );
}
CustomPageLayoutHeader.displayName = 'PageLayoutHeader';

function CustomHead() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Head
      prefix=''
      title={`${profile.displayName} (@${profile.username})`}
      description={profile.bio || ''}
    />
  );
}

function ProfilePage() {
  const { username } = useParams();
  const { width } = useWindowSize();

  return (
    <GQLRenderer ErrorFallback={() => <NotFoundError q={username} />}>
      <ProfileProvider>
        <CustomHead />
        <RelationshipProvider username={username || ''}>
          <ContentLayout>
            <ContentLayoutMain>
              <PageLayout>
                {width && width > 768 ? (
                  <CustomPageLayoutHeader appearAfter={150}>
                    <Container maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
                      <TitleHeader />
                    </Container>
                  </CustomPageLayoutHeader>
                ) : (
                  <PageLayoutHeader>
                    <Container maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
                      <TitleHeader />
                    </Container>
                  </PageLayoutHeader>
                )}
                <PageLayoutContent>
                  <DetailsHeader />
                  <VStack w='100%' css={{ backgroundColor: '#FFF' }}>
                    <ProfileActionsGroup />
                    <InfoGroup />
                    <RelationshipsGroup />
                  </VStack>
                  {/* Horizontal Rule*/}
                  <Box borderBottom={1} borderColor='base100' />{' '}
                  <ProfileContent />
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
        </RelationshipProvider>
      </ProfileProvider>
    </GQLRenderer>
  );
}

export default ProfilePage;
