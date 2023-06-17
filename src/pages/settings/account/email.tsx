import { useContext } from 'react';
import { HeaderLayout } from 'layouts';
import { Head, Error } from 'components';
import { Paths } from 'shared';
import { useUpdateAccountInfo } from 'lib';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { isEqual, pick } from 'lodash';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
} from '@holdr-ui/react';

function EmailSettingPage() {
  const { data } = useContext(AccountInfoContext);
  const {
    loading: loadingMutation,
    error: errorMutation,
    // onSubmit,
    // onFinish,
  } = useUpdateAccountInfo();

  return (
    <Error
      hasError={!!errorMutation}
      errorMessage={errorMutation?.message}
    >
      <Head
        title='Update email'
        description='Change your email.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <HeaderLayout
        title='Email'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) => isEqual(values, pick(data, 'email')),
            data: data,
            name: 'email',
          }}
        >
          <VStack>
            <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
              <Box css={{ opacity: 0.5 }}>
                <FormControl disabled>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    defaultValue={data.email}
                    css={{ 'user-select': 'none' }}
                  />
                </FormControl>
              </Box>
            </Box>
            <HStack justify='flex-end' p={4}>
              <Button>Update</Button>
            </HStack>
          </VStack>
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;
