import { HeaderLayout } from 'layouts';
import { Head, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { isEqual, pick } from 'lodash';
import { useUpdateAccountInfo } from 'lib';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';
import { useContext } from 'react';

function CountrySettingPage() {
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
        title='Update country'
        description='Change your country.'
        url={`${Paths.settings}/${Paths.setting.country}`}
      />
      <HeaderLayout
        title='Country'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) => isEqual(values, pick(data, 'country')),
            data: data,
            name: 'country',
          }}
        >
          <AccountInfoForm
            initialValues={{
              country: data.country,
            }}
            onSubmit={onSubmit}
            onFinish={onFinish}
          />
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
CountrySettingPage.displayName = 'CountrySettingPage';

export default CountrySettingPage;
