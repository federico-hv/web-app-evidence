import { HeaderLayout } from '../../../layouts';
import { Head, SettingCheckbox, Error, Loader } from '../../../components';
import { Box } from '@holdr-ui/react';
import { Paths } from '../../../shared';
import { useLocation } from 'react-router-dom';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { useAccountInfo, useUpdateAccountInfo } from '../../../lib';
import { ChangeEvent } from 'react';

function usePrevPath(defaultLocation: string) {
  const { state } = useLocation();
  if (state) {
    return state.prevPath;
  }
  return defaultLocation;
}

function ProtectAndTaggingSettingsPage() {
  const {
    loading: queryLoading,
    data: queryData,
    error: queryError,
  } = useAccountInfo();

  const { error: mutationError, onSubmit } = useUpdateAccountInfo();
  // useful way of checking what the prev path was and whether to go back there or to the default root
  const to = usePrevPath(prefix(RootSettingsPath, Paths.setting.privacy));

  return (
    <Error
      hasError={!!queryError || !!mutationError}
      errorEl={<Box>{queryError?.message || mutationError?.message}</Box>}
    >
      <Head
        title='Protection'
        description='Manage whether other users can view your posts, likes and other activity.'
        url={to}
      />
      <Loader loading={queryLoading}>
        {queryData && (
          <HeaderLayout title='Protection' backLink={to}>
            <Box p={4} borderBottom={2} borderColor='base100'>
              <SettingCheckbox
                value={queryData.accountInfo.protected}
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  let protectedAccount = false;
                  if (e.target.value === 'false') {
                    protectedAccount = true;
                  }

                  await onSubmit({
                    protected: protectedAccount,
                  });
                }}
                heading='Protect your account'
                subheading='When selected, only users that follow you will be allowed to see your likes, posts and account information.'
              />
            </Box>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
ProtectAndTaggingSettingsPage.displayName =
  'ProtectAndTaggingSettingsPage';

export default ProtectAndTaggingSettingsPage;
