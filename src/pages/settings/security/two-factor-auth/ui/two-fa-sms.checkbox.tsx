import { Checkbox, HStack } from '@holdr-ui/react';
import { TextGroup } from '../../../../../shared';

function TwoFASmsCheckbox() {
  return (
    <HStack cursor='pointer' as='label' px={4} items='center'>
      <TextGroup>
        <TextGroup.Heading id='heading__2fa-sms' size={3}>
          Text Message
        </TextGroup.Heading>
        <TextGroup.Subheading
          size={2}
          color='base400'
          css={{ userSelect: 'none' }}
        >
          Logging into Holdr will prompt a text message to be sent to your
          mobile device with an authentication code
        </TextGroup.Subheading>
      </TextGroup>
      <Checkbox disabled labelledBy='' />
    </HStack>
  );
}
TwoFASmsCheckbox.displayName = 'TwoFASmsCheckbox';

export default TwoFASmsCheckbox;
