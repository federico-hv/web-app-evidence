import { VStack } from '@holdr-ui/react';
import { PrivacySection, SecuritySection } from './ui';

function SettingsPrivacyAndSafetyPage() {
  return (
    <VStack gap={8}>
      <SecuritySection />
      <PrivacySection />
    </VStack>
  );
}
SettingsPrivacyAndSafetyPage.displayName = 'SettingsPrivacyAndSafetyPage';

export default SettingsPrivacyAndSafetyPage;
