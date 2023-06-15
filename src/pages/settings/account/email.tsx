import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { AccountInfoForm, Head, Error, Loader } from 'components';
import { Paths } from 'shared';
import { useUpdateAccountInfo, useAccountInfo } from 'lib';
import { AccountInfoContextProvider } from '../../../contexts';
import { isEqual, pick } from 'lodash';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';

function EmailSettingPage() {
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
        title='Update email'
        description='Change your email.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout
            title='Email'
            backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
          >
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(values, pick(data.accountInfo, 'email')),
                data: data.accountInfo,
                name: 'email',
              }}
            >
              <AccountInfoForm
                initialValues={{ email: data.accountInfo.email }}
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
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;
