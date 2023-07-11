import { isEqual, pick } from 'lodash';
import {
  useAccountInfo,
  AccountInfoForm,
  AccountInfoFormContextProvider,
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

function UsernameSettingPage() {
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
        title='Update username'
        description='Change your username.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <HeaderLayout
        title='Username'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) => isEqual(values, pick(data, 'username')),
            data: data,
            name: 'username',
          }}
        >
          <AccountInfoForm
            initialValues={{ username: data.username }}
            onSubmit={onSubmit}
            onFinish={onFinish}
          />
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
UsernameSettingPage.displayName = 'UsernameSettingPage';

export default UsernameSettingPage;
