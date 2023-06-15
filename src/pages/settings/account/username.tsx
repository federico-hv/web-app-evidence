import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Error, Loader, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import { isEqual, pick } from 'lodash';
import { useUpdateAccountInfo, useAccountInfo } from 'lib';
import { AccountInfoContextProvider } from 'contexts';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';

function UsernameSettingPage() {
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
        title='Update username'
        description='Change your username.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout
            title='Username'
            backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
          >
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(values, pick(data.accountInfo, 'username')),
                data: data.accountInfo,
                name: 'username',
              }}
            >
              <AccountInfoForm
                initialValues={{ username: data.accountInfo.username }}
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
UsernameSettingPage.displayName = 'UsernameSettingPage';

export default UsernameSettingPage;
