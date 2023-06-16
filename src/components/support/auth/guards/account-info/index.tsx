import { Outlet } from 'react-router-dom';
import { useAccountInfo } from '../../../../../lib';
import { AccountInfoContextProvider } from '../../../../../contexts';
import { prefix } from '../../../../../utilities';
import { Paths, RootSettingsPath } from '../../../../../shared';
import { Error, Loader } from '../../../../utility';
import PasswordConfirmation from '../../../password-confirmation';

function AccountInfoGuard() {
  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useAccountInfo();

  return (
    <Error
      hasError={!!errorQuery}
      errorEl={
        <PasswordConfirmation
          name='Account Information'
          backLink={prefix(RootSettingsPath, Paths.setting.account)}
        />
      }
    >
      <Loader loading={loadingQuery}>
        {data && (
          <AccountInfoContextProvider value={{ data: data.accountInfo }}>
            <Outlet />
          </AccountInfoContextProvider>
        )}
      </Loader>
    </Error>
  );
}
AccountInfoGuard.displayName = 'AccountInfoGuard';

export default AccountInfoGuard;
