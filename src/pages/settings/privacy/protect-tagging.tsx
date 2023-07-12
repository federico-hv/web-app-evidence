import { ChangeEvent } from 'react';
import { useAccountInfo, useUpdateAccountInfo } from '../../../features';
import {
  Error,
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
  TextGroupHeading,
  TextGroupSubheading,
  usePrevPath,
} from '../../../shared';
import { Box, Checkbox, HStack } from '@holdr-ui/react';

function ProtectAndTaggingSettingsPage() {
  const { data: accountInfo } = useAccountInfo();

  const { error, onSubmit, loading } = useUpdateAccountInfo();

  const to = usePrevPath(prefix(RootSettingsPath, Paths.setting.privacy));

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Protection'
        description='Manage whether other users can view your posts, likes and other activity.'
        url={to}
      />
      <HeaderLayout title='Protection' backLink={to}>
        <Box p={4} borderBottom={2} borderColor='base100'>
          <HStack justify='space-between'>
            <TextGroupHeading id='protection-checkbox'>
              Protect your account
            </TextGroupHeading>
            <TextGroupSubheading>
              When selected, only users that follow you will be allowed to
              see your likes, posts and account information.
            </TextGroupSubheading>
            <Checkbox
              value={accountInfo.protected.toString()}
              disabled={loading}
              checked={accountInfo.protected}
              labelledBy='protection-checkbox'
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                let protectedAccount = false;
                if (e.target.value === 'false') {
                  protectedAccount = true;
                }

                await onSubmit({
                  protected: protectedAccount,
                });
              }}
            />
          </HStack>
        </Box>
      </HeaderLayout>
    </Error>
  );
}
ProtectAndTaggingSettingsPage.displayName =
  'ProtectAndTaggingSettingsPage';

export default ProtectAndTaggingSettingsPage;
