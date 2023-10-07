import {
  Error,
  Head,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../../shared';
import {
  useUpdatePassword,
  UpdatePasswordContextProvider,
  UpdatePasswordForm,
} from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function ChangePasswordSettingPage() {
  const { loading, error, data, onFinish, onSubmit } = useUpdatePassword();
  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Change Password'
        description='Change your password at any time.'
        url={`${Paths.settings}/${Paths.setting.change_password}`}
      />
      <SettingsHeaderLayout
        title='Change your password'
        backLink={prefix(RootSettingsPath, Paths.setting.account)}
      >
        <UpdatePasswordContextProvider
          value={{ data: data?.updatePassword, loading }}
        >
          <UpdatePasswordForm onSubmit={onSubmit} onFinish={onFinish} />
        </UpdatePasswordContextProvider>
      </SettingsHeaderLayout>
    </Error>
  );
}
ChangePasswordSettingPage.displayName = 'ChangePasswordSettingPage';

export default ChangePasswordSettingPage;
