import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Loader, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import { useAccountInfo, useUpdateAccountInfo } from '../../../hooks';
import { AccountInfoContextProvider } from '../../../contexts';
import { isEqual, lowerCase, pick } from 'lodash';

function CountrySettingPage() {
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
        title='Update country'
        description='Change your country.'
        url={`${Paths.settings}/${Paths.setting.country}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout title='Email'>
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(values, pick(data.accountInfo, 'country')),
                data: data.accountInfo,
                name: 'country',
              }}
            >
              <AccountInfoForm
                initialValues={{
                  country: lowerCase(data.accountInfo.country),
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
CountrySettingPage.displayName = 'CountrySettingPage';

export default CountrySettingPage;
