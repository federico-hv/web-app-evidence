import {
  AccountInfoForm,
  AccountInfoFormContextProvider,
  useAccountInfo,
  useUpdateAccountInfo,
} from '../../../features';
import {
  Error,
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../shared';
import { isEqual, pick } from 'lodash';

function CountrySettingPage() {
  const { data } = useAccountInfo();
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
