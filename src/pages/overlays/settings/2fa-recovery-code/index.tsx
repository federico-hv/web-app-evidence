import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Heading, HStack, Text, VStack } from '@holdr-ui/react';
import {
  Loader,
  makeButtonLarger,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCopyToClipboard,
} from '../../../../shared';
import {
  useRefreshTwoFARecoveryCodeMutation,
  useTwoFARecoveryKeySuspenseQuery,
} from '../../../../features';
import CopyIcon from '../../../../tmp/copy-icon';

function TwoFARecoveryCodePage() {
  const copyToClipboard = useCopyToClipboard();

  const { data } = useTwoFARecoveryKeySuspenseQuery();

  const { refreshTwoFARecoveryCode, loading } =
    useRefreshTwoFARecoveryCodeMutation();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <VStack h={500} gap={4}>
      <HStack
        pb={5}
        borderBottom={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        justify='space-between'
        px={5}
        pt={5}
      >
        <Heading size={6} weight={500}>
          2FA Recovery Code
        </Heading>
      </HStack>
      <VStack flex={1} px={4}>
        <VStack flex={1}>
          <TextGroup gap={0}>
            <TextGroupHeading
              size={3}
              as='h5'
              css={{ lineHeight: '150%' }}
            >
              Save your recovery code
            </TextGroupHeading>
            <TextGroupSubheading size={2} color='white700' weight={500}>
              Store your recovery code somewhere safe in case you need to
              get into your account and you have lost access to you 2FA
              application.
            </TextGroupSubheading>
          </TextGroup>
          <Loader h='100%' loading={loading}>
            <VStack
              h='100%'
              gap={4}
              items='center'
              justify='center'
              flex={1}
            >
              <HStack
                onClick={() => copyToClipboard(data.twoFARecoveryKey)}
                px={4}
                py={3}
                radius={1}
                bgColor='rgba(152, 152, 255, 0.25)'
                items='center'
                gap={2}
                w='fit-content'
              >
                <Text as='code' spacing='wider' size={5} weight={300}>
                  {data.twoFARecoveryKey}
                </Text>
                <CopyIcon color='white700' size={16} />
              </HStack>
              <Button
                onClick={async () => refreshTwoFARecoveryCode()}
                type='button'
                variant='ghost'
                size='sm'
                colorTheme='white500'
                radius={1}
                className={makeButtonLarger('2rem')}
              >
                Generate new code
              </Button>
            </VStack>
          </Loader>
        </VStack>
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          pt={5}
          pb={5}
          gap={5}
        >
          <Button
            onClick={() =>
              navigate(
                location.state.previousLocation ??
                  makePath([Paths.settings, Paths.setting.account]),
              )
            }
            colorTheme='purple500'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Close
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default TwoFARecoveryCodePage;
