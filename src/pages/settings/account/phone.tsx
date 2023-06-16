import { useContext } from 'react';
import { HeaderLayout } from 'layouts';
import { AccountInfoForm, Error, Head } from 'components';
import { Paths } from 'shared';
import { isEqual, pick } from 'lodash';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { useUpdateAccountInfo } from 'lib';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';

function PhoneSettingPage() {
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
        title='Update phone'
        description='Change your phone number.'
        url={`${Paths.settings}/${Paths.setting.phone}`}
      />
      <HeaderLayout
        title='Phone'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) => isEqual(values, pick(data, 'phone')),
            data: data,
            name: 'phone',
          }}
        >
          <AccountInfoForm
            initialValues={{ phone: data.phone || '' }}
            onSubmit={onSubmit}
            onFinish={onFinish}
          />
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
