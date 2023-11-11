import {
  GET_ACCOUNT_INFO,
  IAccountInfo,
  useUpdateAccountInfo,
} from '../../../../features';
import {
  Error,
  Head,
  Loader,
  Paths,
  prefix,
  RootSettingsPath,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePrevPath,
} from '../../../../shared';
import { Box, Checkbox, HStack } from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function ProtectAndTaggingSettingsPage() {
  const {
    loading: loadingQuery,
    data,
    error: errorQuery,
  } = useQuery<{ accountInfo: IAccountInfo }>(GET_ACCOUNT_INFO);

  const { error, onSubmit, loading } = useUpdateAccountInfo();

  const to = usePrevPath(prefix(RootSettingsPath, Paths.setting.privacy));

  return (
    <Error
      hasError={!!error || !!errorQuery}
      errorMessage={error?.message || errorQuery?.message}
    >
      <Head
        title='Protection'
        description='Manage whether other users can view your posts, likes and other activity.'
        url={to}
      />
      <SettingsHeaderLayout title='Protection' backLink={to}>
        <Box p={4} borderBottom={2} borderColor='base100'>
          <HStack justify='space-between' items='center'>
            <TextGroup>
              <TextGroupHeading size={3} id='protection-checkbox'>
                Protect your account
              </TextGroupHeading>
              <TextGroupSubheading size={2} color='base400'>
                When selected, only users that follow you will be allowed
                to see your likes, posts and account information.
              </TextGroupSubheading>
            </TextGroup>
            <Loader loading={loadingQuery}>
              {data && (
                <Checkbox
                  value={`${data.accountInfo.protected}`}
                  disabled={loading}
                  checked={data.accountInfo.protected}
                  labelledBy='protection-checkbox'
                  onChange={async () => {
                    await onSubmit({
                      protected: !data.accountInfo.protected,
                    });
                  }}
                />
              )}
            </Loader>
          </HStack>
        </Box>
      </SettingsHeaderLayout>
    </Error>
  );
}
ProtectAndTaggingSettingsPage.displayName =
  'ProtectAndTaggingSettingsPage';

export default ProtectAndTaggingSettingsPage;
