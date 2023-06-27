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
import { HeaderLayout } from 'layouts';
import { Paths } from 'shared';
import { Head, Error, Loader } from 'components';
import { prefix } from 'utilities';
import { RootSettingsPath } from './root';
import { GET_2FA_RECOVERY_KEY, useRefresh2FARecoveryKey } from 'lib';

function BackupCode() {
  const { refresh2FARecoveryKey, loading: loadingMutation } =
    useRefresh2FARecoveryKey();
  const { loading, error, data } = useQuery<{ twoFARecoveryKey: string }>(
    GET_2FA_RECOVERY_KEY,
  );

  return (
    <Error hasError={!!error} errorEl={<Box>{error?.message}</Box>}>
      <Head
        title='2FA Recovery Key'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.backup_code)}
      />
      <HeaderLayout
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
                    onClick={() => {
                      navigator.clipboard.writeText(data.twoFARecoveryKey);
                    }}
                  >
                    <Icon name='collections-outline' />
                    <Text size={4} weight={500}>
                      {data.twoFARecoveryKey}
                    </Text>
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
      </HeaderLayout>
    </Error>
  );
}
BackupCode.displayName = 'BackupCode';

export default BackupCode;
