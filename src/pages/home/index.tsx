import {
  arrayFrom,
  Error,
  ErrorFallback,
  GQLRenderer,
  Head,
  Responsive,
  ResponsiveItem,
  Slider,
} from '../../shared';
import { Center, VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  SmHeader,
} from '../../layout';
import {
  SliderControls,
  SliderNextButton,
  SliderPreviousButton,
  SliderIndicator,
  SliderSlide,
} from '../../shared/components/slider';

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
              <Slider
                loop={true}
                animation='slide'
                autoplay={{ active: false }}
              >
                <SliderControls>
                  <SliderNextButton />
                  <SliderPreviousButton />
                </SliderControls>
                <SliderIndicator py={3} gap={4} />
                {arrayFrom(4).map((idx) => (
                  <SliderSlide
                    key={idx}
                    css={{ backgroundColor: '#ff4ff2' }}
                  >
                    <Center h='100%'>Slide {idx + 1}</Center>
                  </SliderSlide>
                ))}
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
