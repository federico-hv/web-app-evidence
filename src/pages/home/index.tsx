import {
  Error,
  ErrorFallback,
  GQLRenderer,
  Head,
  Responsive,
  ResponsiveItem,
  Slider,
} from '../../shared';
import { Center, Image, VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  SmHeader,
} from '../../layout';
import { FadeSlider } from '../../shared/components/slider/ui';
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
              <Slider animation='slide' loop={false} autoplay={false}>
                <Slider.Controls>
                  <Slider.Controls.NextButton />
                  <Slider.Controls.PreviousButton />
                </Slider.Controls>
                <Slider.Indicator />
                <Slider.Content>
                  {Array.from({ length: 6 }, (_, idx) => (
                    <Slider.Slide key={idx}>
                      <Center
                        w='full'
                        h='full'
                        style={{
                          backgroundColor: `#${Math.floor(
                            Math.random() * 16777215,
                          )
                            .toString(16)
                            .padStart(6, '0')}`,
                        }}
                      >
                        {'Slide ' + ++idx}
                      </Center>
                    </Slider.Slide>
                  ))}
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
