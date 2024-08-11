import { VStack } from '@holdr-ui/react';
import {
  AccountInfoForm,
  ChangePassword,
  ConnectedAccountsList,
  ContactInfoGroup,
} from './ui';
import { GQLRenderer, Head } from '../../../shared';

function SettingsAccountPage() {
  return (
    <GQLRenderer>
      <Head
        prefix='Settings - '
        title='Account'
        description='Update your Holdr account information, passwword and contact details.'
      />
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
