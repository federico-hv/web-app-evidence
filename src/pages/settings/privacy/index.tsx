import { VStack } from '@holdr-ui/react';
import { PrivacySection, SecuritySection } from './ui';
import { GQLRenderer, Head } from '../../../shared';

function SettingsPrivacyAndSafetyPage() {
  return (
    <GQLRenderer>
      <Head
        prefix='Settings - '
        title='Privacy and Safety'
        description='Configure your Holdr privacy settings to allow you to control who can view your account and what you can see from other users..'
      />
      <VStack gap={8}>
        <SecuritySection />
        <PrivacySection />
      </VStack>
    </GQLRenderer>
  );
}
SettingsPrivacyAndSafetyPage.displayName = 'SettingsPrivacyAndSafetyPage';

export default SettingsPrivacyAndSafetyPage;
