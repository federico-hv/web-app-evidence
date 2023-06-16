import { useContext } from 'react';
import { HeaderLayout } from 'layouts';
import { AccountInfoForm, Head, Error } from 'components';
import { Paths } from 'shared';
import { useUpdateAccountInfo } from 'lib';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { isEqual, pick } from 'lodash';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';

function EmailSettingPage() {
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
          <AccountInfoForm
            initialValues={{ email: data.email }}
            onSubmit={onSubmit}
            onFinish={onFinish}
          />
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;
