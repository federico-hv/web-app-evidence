import { Input, VStack, Text, HStack, Button } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head } from 'components';
import { Paths } from 'shared';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';

function ChangePasswordSettingPage() {
  return (
    <>
      <Head
        title='Change Password'
        description='Change your password at any time.'
        url={`${Paths.settings}/${Paths.setting.change_password}`}
      />
      <HeaderLayout
        title='Change your password'
        backLink={prefix(RootSettingsPath, Paths.setting.account)}
      >
        <VStack as='form'>
          <VStack
            gap={3}
            px={4}
            pb={5}
            borderBottom={2}
            borderColor='base100'
          >
            <Input placeholder='Current password' />
            <a
              href={`${
                import.meta.env.VITE_AUTH_APP_URL
              }/reset-password/request`}
            >
              <Text
                size={2}
                color='base400'
                css={{ textDecoration: 'underline' }}
              >
                Forgot Password?
              </Text>
            </a>
          </VStack>
          <VStack
            px={4}
            py={5}
            gap={5}
            borderBottom={2}
            borderColor='base100'
          >
            <Input placeholder='New password' />
            <Input placeholder='Confirm password' />
          </VStack>
        </VStack>
        <HStack p={4} justify='flex-end'>
          <Button disabled={true}>Update</Button>
        </HStack>
      </HeaderLayout>
    </>
  );
}
ChangePasswordSettingPage.displayName = 'ChangePasswordSettingPage';

export default ChangePasswordSettingPage;
