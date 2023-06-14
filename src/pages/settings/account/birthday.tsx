import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Loader, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import dayjs from 'dayjs';
import { useAccountInfo, useUpdateAccountInfo } from '../../../hooks';
import { isEqual, pick } from 'lodash';
import { AccountInfoContextProvider } from '../../../contexts';

function BirthdaySettingPage() {
  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useAccountInfo();

  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateAccountInfo();
  return (
    <Error
      hasError={!!errorQuery || !!errorMutation}
      errorEl={<Box>{errorQuery?.message || errorMutation?.message}</Box>}
    >
      <Head
        title='Update birthday'
        description='Change your birthday.'
        url={`${Paths.settings}/${Paths.setting.birthday}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout title='Birthday'>
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(values, pick(data.accountInfo, 'birthday')),
                data: data.accountInfo,
                name: 'birthday',
              }}
            >
              <AccountInfoForm
                initialValues={{
                  birthday: dayjs(data.accountInfo.birthday).format(
                    'YYYY-MM-DD',
                  ),
                }}
                onSubmit={onSubmit}
                onFinish={onFinish}
              />
            </AccountInfoContextProvider>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
BirthdaySettingPage.displayName = 'BirthdaySettingPage';

export default BirthdaySettingPage;
