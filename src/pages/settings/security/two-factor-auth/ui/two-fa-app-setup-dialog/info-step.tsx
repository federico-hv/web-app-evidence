import { VStack } from '@holdr-ui/react';
import {
  Asset,
  InfoItem,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../../../shared';
import { Fragment } from 'react';

function InfoStep() {
  return (
    <Fragment>
      <VStack gap={{ '@bp1': 5, '@bp3': 6 }}>
        <TextGroup gap={{ '@bp1': 0, '@bp3': 2 }}>
          <TextGroupHeading
            size={{ '@bp1': 3, '@bp3': 4 }}
            casing='capitalize'
          >
            Get Started
          </TextGroupHeading>
          <TextGroupSubheading size={2}>
            Protect your account in two easy steps.
          </TextGroupSubheading>
        </TextGroup>
        <VStack gap={{ '@bp1': 4, '@bp3': 5 }}>
          <InfoItem
            imageSrc={Asset.Icon.QRCode}
            imageAltText='qr code icon'
            title='Use authentication app'
            description='Scan the QR code that we generate for you, using a secure
              authenticator (like Google Authenticator or Authy).'
          />
          <InfoItem
            imageSrc={Asset.Icon.Keyboard}
            imageAltText='keyboard'
            title='Enter confirmation code'
            description='Two-factor authentication will be enabled once the code
              generated by the authenticator app is entered and confirmed.
              It can be turned off anytime.'
          />
        </VStack>
      </VStack>
    </Fragment>
  );
}
InfoStep.displayName = 'InfoStep';

export default InfoStep;
