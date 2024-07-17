import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {
  Error,
  Loader,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../shared';
import { AccountInfoContextProvider, IAccountInfo } from '../shared';
import PasswordConfirmation from './password-confimation';
import { GET_ACCOUNT_INFO } from '../../user';

/**
 * This react is responsible for protecting the account info router.
 *
 * A user must enter a password and have the account info scope in their
 * access token.
 * @constructor
 */
function AccountInfoGuard() {
  const { loading, error, data } = useQuery<{
    accountInfo: IAccountInfo;
  }>(GET_ACCOUNT_INFO);

  return (
    <Error
      hasError={!!error}
      errorEl={
        <PasswordConfirmation
          name='Account Information'
          backLink={prefix(RootSettingsPath, Paths.setting.account)}
        />
      }
    >
      <Loader loading={loading}>
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
