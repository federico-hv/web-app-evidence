import { HeaderLayout } from 'layouts';
import { AccountInfoForm, Error, Head, Loader } from 'components';
import { Paths } from 'shared';
import { isEqual, pick } from 'lodash';
import { AccountInfoContextProvider } from 'contexts';
import { useAccountInfo, useUpdateAccountInfo } from 'hooks';
import { Box } from '@holdr-ui/react';

function PhoneSettingPage() {
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
        title='Update phone'
        description='Change your phone number.'
        url={`${Paths.settings}/${Paths.setting.phone}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout title='Phone'>
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(values, pick(data.accountInfo, 'phone')),
                data: data.accountInfo,
                name: 'phone',
              }}
            >
              <AccountInfoForm
                initialValues={{ phone: data.accountInfo.phone || '' }}
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
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
