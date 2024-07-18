import { Box, Heading } from '@holdr-ui/react';
import dayjs from 'dayjs';
import {
  AccountInfoForm,
  AccountInfoFormContextProvider,
  useAccountInfo,
  useUpdateAccountInfo,
} from '../../../../features';
import {
  Error,
  Head,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../../shared';
import { isEqual } from 'lodash';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function BirthdaySettingPage() {
  const { data } = useAccountInfo();
  const { loading, error, onSubmit, onFinish } = useUpdateAccountInfo();

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Update birthday'
        description='Change your birthday.'
        url={`/${RootSettingsPath}/${Paths.setting.birthday}`}
      />
      <SettingsHeaderLayout
        title='Birthday'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <Box p={4}>
          <Heading as='h2' size={4}>
            Birthday
          </Heading>
        </Box>
        <AccountInfoFormContextProvider
          value={{
            loading: loading,
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
      </SettingsHeaderLayout>
    </Error>
  );
}
BirthdaySettingPage.displayName = 'BirthdaySettingPage';

export default BirthdaySettingPage;
