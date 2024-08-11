import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  checkboxFix,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useAlertDialog,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { useLocation } from 'react-router-dom';
import {
  TwoFAChannelEnum,
  useDisableTwoFAMutation,
  useTwoFaChannelSuspenseQuery,
} from '../../../../features';
import { Fragment } from 'react';

function SecuritySection() {
  const { openWith } = useAlertDialog();

  const location = useLocation();

  const { disableTwoFA, loading } = useDisableTwoFAMutation();

  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const { data } = useTwoFaChannelSuspenseQuery();

  const goto = (path: string) =>
    navigate(makePath([Paths.settings, Paths.setting.privacy, path]));

  const twoFAIsEnabled = data.twoFAChannel === 'app';

  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Security
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Manage your account security
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
      >
        <TextGroup>
          <TextGroupHeading as='h5' size={3} weight={500}>
            Two-factor authentication
          </TextGroupHeading>
          <TextGroupSubheading size={2} weight={300} color='white700'>
            Enhance your account security by enabling two-factor
            authentication. In addition to your Holdr password, you can use
            a text message, authentication app, or security key for added
            protection against unauthorized access.
          </TextGroupSubheading>
          {/*<TextGroupSubheading size={2} color='purple200'>*/}
          {/*  Learn more*/}
          {/*</TextGroupSubheading>*/}
        </TextGroup>
        <Box
          my={5}
          h='1px'
          w='full'
          bgColor='rgba(152, 152, 255, 0.05)
'
        />
        <HStack
          onClick={
            twoFAIsEnabled
              ? () =>
                  openWith({
                    title: 'Disable 2FA',
                    description:
                      'Are you sure you want to disable the 2FA protection on your account? You will have to set the 2FA protection again once it is disabled.',
                    actionText: 'Disable 2FA',
                    onAction: async () => {
                      await disableTwoFA(TwoFAChannelEnum.App);
                    },
                  })
              : () => goto(Paths.setting.setup_2fa)
          }
          justify='space-between'
          css={{
            opacity: loading ? 0.5 : undefined,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          <VStack justify='space-between'>
            <TextGroupHeading
              id='2fa-connection'
              as='h5'
              size={3}
              weight={500}
            >
              Connect authenticator app
            </TextGroupHeading>
            <TextGroupSubheading size={2} weight={300} color='white700'>
              Use a 2FA app to authenticate yourself on login and other
              secure actions.
            </TextGroupSubheading>
          </VStack>
          <Checkbox
            readOnly
            checked={twoFAIsEnabled}
            size='sm'
            colorTheme='white500'
            labelledBy='2fa-connection'
            className={checkboxFix()}
          />
        </HStack>
        {twoFAIsEnabled && (
          <Fragment>
            <Box
              my={5}
              h='1px'
              w='full'
              bgColor='rgba(152, 152, 255, 0.05)'
            />
            <HStack
              justify='space-between'
              onClick={() => goto(Paths.setting.two_fa_recovery_code)}
            >
              <Text weight={500}>View 2FA recovery code</Text>
              <Icon name='caret-right-outline' />
            </HStack>
          </Fragment>
        )}
      </VStack>
    </Box>
  );
}
SecuritySection.displayName = 'SecuritySection';

export default SecuritySection;
