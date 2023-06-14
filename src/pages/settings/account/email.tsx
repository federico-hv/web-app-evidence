import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { AccountInfoForm, Head, Error, Loader } from 'components';
import { Paths } from 'shared';
import { useAccountInfo, useUpdateAccountInfo } from '../../../hooks';
import { AccountInfoContextProvider } from '../../../contexts';
import { isEqual, pick } from 'lodash';

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
          <HeaderLayout title='Email'>
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
