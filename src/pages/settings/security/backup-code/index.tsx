import {
  Box,
  VStack,
  Text,
  Center,
  Icon,
  HStack,
  Button,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Error,
  Head,
  Loader,
  Paths,
  prefix,
  useCopyToClipboard,
} from '../../../../shared';
import { useEffect } from 'react';
import { RootSettingsPath } from '../root';
import {
  GET_2FA_RECOVERY_KEY,
  useRefresh2FARecoveryKey,
} from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function BackupCodeSettingsPage() {
  const navigate = useNavigate();
  const copyToClipboard = useCopyToClipboard(
    'Copied recovery key to clipboard',
  );
  const { refresh2FARecoveryKey, loading: loadingMutation } =
    useRefresh2FARecoveryKey();
  const { loading, error, data } = useQuery<{ twoFARecoveryKey: string }>(
    GET_2FA_RECOVERY_KEY,
  );

  useEffect(() => {
    if (!data && !loading) {
      navigate(prefix(RootSettingsPath, Paths.setting.login_security));
    }
  }, [data, error, loading, navigate]);

  return (
    <Error hasError={!!error} errorEl={<Box>{error?.message}</Box>}>
      <Head
        title='2FA Recovery Key'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.backup_code)}
      />
      <SettingsHeaderLayout
        title='Recovery keys'
        backLink={prefix(RootSettingsPath, Paths.setting.login_security)}
      >
        <Loader loading={loading}>
          {data && (
            <Box>
              <VStack p={4} gap={5} borderBottom={2} borderColor='base100'>
                <Text>
                  Store this recovery key safely somewhere. It can be used
                  to access your account if you ever lose your device or
                  access to your authenticator.
                </Text>
                <VStack gap={3}>
                  <HStack
                    justify='center'
                    w='full'
                    gap={4}
                    p={4}
                    bgColor='base100'
                    radius={1}
                    cursor='pointer'
                    onClick={() => copyToClipboard(data.twoFARecoveryKey)}
                  >
                    <Text size={4} weight={500}>
                      {data.twoFARecoveryKey}
                    </Text>
                    <Icon name='collections-outline' />
                  </HStack>
                  <Center>
                    <Text size={2} color='base400'>
                      The code above can only be used once.
                    </Text>
                  </Center>
                </VStack>
              </VStack>
              <Center mt={4}>
                <Button
                  onClick={refresh2FARecoveryKey}
                  isLoading={loadingMutation}
                  loadingText={loadingMutation ? '' : 'Refreshing'}
                >
                  Refresh key
                </Button>
              </Center>
            </Box>
          )}
        </Loader>
      </SettingsHeaderLayout>
    </Error>
  );
}
BackupCodeSettingsPage.displayName = 'BackupCodeSettingsPage';

export default BackupCodeSettingsPage;
