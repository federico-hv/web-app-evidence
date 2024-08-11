import { VStack } from '@holdr-ui/react';
import {
  AccountInfoForm,
  ChangePassword,
  ConnectedAccountsList,
  ContactInfoGroup,
} from './ui';
import { GQLRenderer } from '../../../shared';

function SettingsAccountPage() {
  return (
    <GQLRenderer>
      <VStack gap={8}>
        <AccountInfoForm />
        <ContactInfoGroup />
        <ChangePassword />
        <ConnectedAccountsList />
      </VStack>
    </GQLRenderer>
  );
}
SettingsAccountPage.displayName = 'SettingsAccountPage';

export default SettingsAccountPage;
