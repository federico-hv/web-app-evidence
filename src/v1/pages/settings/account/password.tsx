import { HeaderLayout } from '../../../layouts';
import { Head, Error, UpdatePasswordForm } from '../../../components';
import { Paths } from '../../../shared';
import { prefix } from '../../../utilities';
import { useUpdatePassword } from '../../../lib';
import { RootSettingsPath } from '../security/root';
import { UpdatePasswordContextProvider } from '../../../contexts';

function ChangePasswordSettingPage() {
  const { loading, error, data, onFinish, onSubmit } = useUpdatePassword();
  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Change Password'
        description='Change your password at any time.'
        url={`${Paths.settings}/${Paths.setting.change_password}`}
      />
      <HeaderLayout
        title='Change your password'
        backLink={prefix(RootSettingsPath, Paths.setting.account)}
      >
        <UpdatePasswordContextProvider
          value={{ data: data?.updatePassword, loading }}
        >
          <UpdatePasswordForm onSubmit={onSubmit} onFinish={onFinish} />
        </UpdatePasswordContextProvider>
      </HeaderLayout>
    </Error>
  );
}
ChangePasswordSettingPage.displayName = 'ChangePasswordSettingPage';

export default ChangePasswordSettingPage;
