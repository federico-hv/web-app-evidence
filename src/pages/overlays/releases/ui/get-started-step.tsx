import { VStack } from '@holdr-ui/react';
import {
  Asset,
  Head,
  InfoItem,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { Fragment } from 'react';

function GetStartedStep() {
  return (
    <Fragment>
      <Head prefix='' title='Get Started' />
      <VStack gap={6}>
        <TextGroup mt={3}>
          <TextGroupHeading casing='capitalize'>
            Get Started
          </TextGroupHeading>

          <TextGroupSubheading size={2}>
            Unlock the full potential of our releases feature. Check out
            some of the benefits that you get when you connect your music
            streaming service.
          </TextGroupSubheading>
        </TextGroup>
        <VStack gap={5}>
          <InfoItem
            imageSrc={Asset.Icon.SaveToLibrary}
            imageAltText='save to library logo'
            title='Save to library'
            description='Save the releases that you like into your streaming service library directly
          from Holdr.'
          />
          <InfoItem
            imageSrc={Asset.Icon.Notification}
            imageAltText='new artist logo'
            title='New artist notifications'
            description='We will notify you whenever one of your favorite artists from your streaming services joins Holdr.'
          />
          <InfoItem
            imageSrc={Asset.Icon.UserAdd}
            imageAltText='tastemakers logo'
            title='Tastemakers'
            description='Showcase your favourite playlists and connect with other like-minded fans.'
          />
        </VStack>
      </VStack>
    </Fragment>
  );
}
GetStartedStep.displayName = 'GetStartedStep';

export default GetStartedStep;
