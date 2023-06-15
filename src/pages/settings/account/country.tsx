import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Loader, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import { AccountInfoContextProvider } from 'contexts';
import { isEqual, lowerCase, pick } from 'lodash';
import { useUpdateAccountInfo, useAccountInfo } from 'lib';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';

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
          <HeaderLayout
            title='Country'
            backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
          >
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
