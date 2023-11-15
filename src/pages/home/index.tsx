import {
  Error,
  ErrorFallback,
  GQLRenderer,
  Head,
  Responsive,
  ResponsiveItem,
} from '../../shared';
import { Image, VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  SmHeader,
} from '../../layout';
import { Slider } from 'shared';
//TODO: Rename move

function HomePage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Error hasError={!currentUser} errorEl={<></>}>
        <Head prefix='Holdr Base' title='' description='Home page' />
        <Responsive>
          <ResponsiveItem mobile='show'>
            <SmHeader />
          </ResponsiveItem>
        </Responsive>
        {currentUser && (
          <ContentLayout>
            <ContentLayoutMain>
              <Slider>
                <Slider.Content>
                  <Image
                    fit='cover'
                    src={
                      'https://picsum.photos/1000?random=' + Math.random()
                    }
                    h='200px'
                  />
                </Slider.Content>
                <Slider.Content>
                  <Image
                    fit='cover'
                    src={
                      'https://picsum.photos/1000?random=' + Math.random()
                    }
                    h='200px'
                  />
                </Slider.Content>
                <Slider.Content>
                  <Image
                    fit='cover'
                    src={
                      'https://picsum.photos/1000?random=' + Math.random()
                    }
                    h='200px'
                  />
                </Slider.Content>
                <Slider.Content>
                  <Image
                    fit='cover'
                    src={
                      'https://picsum.photos/1000?random=' + Math.random()
                    }
                    h='200px'
                  />
                </Slider.Content>
              </Slider>
              <VStack gap={4} mt={{ '@bp1': 56, '@bp3': 0 }} w='100%'>
                <FeedTabs />
              </VStack>
            </ContentLayoutMain>
            <ContentLayoutAside>
              <SuggestionsCard />
            </ContentLayoutAside>
          </ContentLayout>
        )}
      </Error>
    </GQLRenderer>
  );
}
HomePage.displayName = 'HomePage';

export default HomePage;
