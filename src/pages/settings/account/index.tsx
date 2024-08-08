import { VStack } from '@holdr-ui/react';
import {
  AccountInfoForm,
  ChangePassword,
  ConnectedAccountsList,
  ContactInfoGroup,
} from './ui';

function SettingsAccountPage() {
  return (
    <VStack gap={8}>
      <AccountInfoForm />
      <ContactInfoGroup />
      <ChangePassword />
      <ConnectedAccountsList />
    </VStack>
  );
}
SettingsAccountPage.displayName = 'SettingsAccountPage';

export default SettingsAccountPage;
