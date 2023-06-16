import { useContext } from 'react';
import { Box, Heading } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import { useUpdateAccountInfo } from 'lib';
import { isEqual } from 'lodash';
import { prefix } from 'utilities';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { RootSettingsPath } from '../security/root';
import dayjs from 'dayjs';

function BirthdaySettingPage() {
  const { data } = useContext(AccountInfoContext);
  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateAccountInfo();

  return (
    <Error
      hasError={!!errorMutation}
      errorMessage={errorMutation?.message}
    >
      <Head
        title='Update birthday'
        description='Change your birthday.'
        url={`/${RootSettingsPath}/${Paths.setting.birthday}`}
      />
      <HeaderLayout
        title='Birthday'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <Box px={4}>
          <Heading as='h2' size={4}>
            Birthday
          </Heading>
        </Box>
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) =>
              isEqual(
                dayjs(values.birthday).format('YYYY-MM-DD'),
                dayjs(data.birthday).format('YYYY-MM-DD'),
              ),
            data: data,
            name: 'birthday',
          }}
        >
          <AccountInfoForm
            initialValues={{
              birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
            }}
            onSubmit={onSubmit}
            onFinish={onFinish}
          />
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
BirthdaySettingPage.displayName = 'BirthdaySettingPage';

export default BirthdaySettingPage;
