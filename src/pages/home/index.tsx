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
  SliderContent,
  SliderControls,
  SliderIndicator,
  SliderNextButton,
  SliderPreviousButton,
  SliderSlide,
} from '../../shared/components/slider';
//TODO: Remove

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
              <Slider autoPlay delay={3} loop animation='fade'>
                <SliderControls>
                  <SliderNextButton />
                  <SliderPreviousButton />
                </SliderControls>
                <SliderIndicator py={3} gap={4} />
                <SliderContent>
                  {arrayFrom(4).map((idx) => (
                    <SliderSlide
                      key={idx}
                      css={{ backgroundColor: '#ff4ff2' }}
                    >
                      <Center h='100%'>Slide {idx + 1}</Center>
                    </SliderSlide>
                  ))}
                </SliderContent>
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
