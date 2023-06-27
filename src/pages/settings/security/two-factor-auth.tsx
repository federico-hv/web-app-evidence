import {
  Box,
  Button,
  Center,
  Checkbox,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Skeleton,
  Text,
  useInputChange,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import {
  Head,
  Stepper,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  Error,
  Loader,
  TextGroupSubheading,
  CommonAlertDialog,
  SettingButton,
} from 'components';
import {
  EnableTwoFAInput,
  extraBtnPadding,
  IStatus,
  Paths,
  TwoFAAppRegistrationModel,
} from 'shared';
import { prefix } from 'utilities';
import { RootSettingsPath } from './root';
import { useCounter } from '../../../hooks';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  DISABLE_TWO_FA,
  ENABLE_TWO_FA,
  GET_TWO_FA_CHANNEL,
  TWO_FA_APP_REGISTRATION,
} from '../../../lib';

export type TwoFAChannel = 'app' | 'sms';

export function useDisableTwoFA() {
  const [mutate, { loading, error, data }] = useMutation<
    { disableTwoFA: IStatus },
    { channel: TwoFAChannel }
  >(DISABLE_TWO_FA);

  const disableTwoFA = async (
    channel: TwoFAChannel,
    cb?: VoidFunction,
  ) => {
    const { data } = await mutate({
      variables: {
        channel: channel,
      },
      update: (cache) => {
        cache.modify({
          fields: {
            twoFAChannel() {
              cache.writeQuery({
                query: GET_TWO_FA_CHANNEL,
                data: '',
              });
            },
          },
        });
      },
    });

    if (data && data.disableTwoFA.status) {
      cb && cb();
    }
  };

  return { loading, error, data, disableTwoFA };
}

export function useEnableTwoFA() {
  const [mutate, { loading: loading, error, data }] = useMutation<
    {
      enableTwoFA: IStatus;
    },
    { payload: EnableTwoFAInput }
  >(ENABLE_TWO_FA);

  const enableTwoFA = async (code: string, cb: VoidFunction) => {
    const { data } = await mutate({
      variables: {
        payload: {
          code: code,
          channel: 'app',
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            twoFAChannel(current) {
              const channel = data?.enableTwoFA.status ? 'app' : current;
              cache.writeQuery({
                query: GET_TWO_FA_CHANNEL,
                data: channel,
              });
            },
          },
        });
      },
    });

    if (data && data.enableTwoFA.status) {
      cb();
    }
  };

  return { enableTwoFA, loading, error, data };
}

function TwoFAAppStep1({ onContinue }: { onContinue?: VoidFunction }) {
  return (
    <>
      <Heading size={5} weight={500}>
        Protect your account in two easy steps.
      </Heading>
      <VStack gap={6}>
        <HStack py={4} px={6} bgColor='base100' radius={4}>
          <TextGroup>
            <TextGroupSubheading weight={500}>
              Link an authentication app to your Holdr account
            </TextGroupSubheading>
            <TextGroupSubheading size={2} color='base400'>
              Scan the QR code that we generate for you, using a secure
              authenticator (like Google Authenticator or Authy).
            </TextGroupSubheading>
          </TextGroup>
        </HStack>
        <HStack py={4} px={6} bgColor='base100' radius={4}>
          <TextGroup>
            <TextGroupSubheading weight={500}>
              Enter the confirmation code
            </TextGroupSubheading>
            <TextGroupSubheading size={2} color='base400'>
              Two-factor authentication will be enabled once the code
              generated by the authenticator app is entered and confirmed.
              It can be turned off anytime.
            </TextGroupSubheading>
          </TextGroup>
        </HStack>
      </VStack>
      <Button onClick={onContinue} fullWidth className={extraBtnPadding()}>
        Begin Setup
      </Button>
    </>
  );
}

function TwoFAAppStep2({
  onContinue,
  data,
}: {
  onContinue?: VoidFunction;
  data: TwoFAAppRegistrationModel;
}) {
  const [view, setView] = useState<'QRCode' | 'Code'>('QRCode');

  return (
    <>
      <TextGroup>
        <TextGroupHeading size={5} weight={500}>
          Link an authentication app to your Holdr account
        </TextGroupHeading>
        <TextGroupSubheading color='base400'>
          <SwitchConditional>
            <SwitchConditionalCase on={view === 'QRCode'}>
              Scan the QR Code using an authentication app. If you do not
              have one, you will need to download one.
            </SwitchConditionalCase>
            <SwitchConditionalCase on={view === 'Code'}>
              {
                "If you're having trouble scanning the QRCode the you can enter the code below to your authentication app."
              }
            </SwitchConditionalCase>
          </SwitchConditional>
        </TextGroupSubheading>
      </TextGroup>
      <VStack items='center' my={5} gap={5}>
        <SwitchConditional>
          <SwitchConditionalCase on={view === 'QRCode'}>
            <Image
              size='225px'
              src={data.qrCodeUrl}
              alt='Two-factor auth QR code'
              fallback={<Skeleton h='250px' w='250px' />}
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setView('Code')}
            >
              {"Can't scan QR Code"}
            </Button>
          </SwitchConditionalCase>
          <SwitchConditionalCase on={view === 'Code'}>
            <Center w='full' bgColor='base100' p={4}>
              <Text size={4} weight={500}>
                {data.code}
              </Text>
            </Center>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setView('QRCode')}
            >
              Try to scan QR Code
            </Button>
          </SwitchConditionalCase>
        </SwitchConditional>
      </VStack>
      <Button onClick={onContinue} fullWidth className={extraBtnPadding()}>
        Next
      </Button>
    </>
  );
}

function CodeStep({ onContinue }: { onContinue: VoidFunction }) {
  // TODO: Pass error to a global error context provider
  const { loading, data, enableTwoFA } = useEnableTwoFA();

  const { value, handleOnChange } = useInputChange('');

  return (
    <>
      <VStack gap={6}>
        <TextGroup>
          <TextGroupHeading size={5} weight={500}>
            Enter the confirmation code
          </TextGroupHeading>
          <TextGroupSubheading color='base400'>
            Follow the instructions on the authentication app. Once the
            authentication app generates a code enter it here.
          </TextGroupSubheading>
          <TextGroupSubheading color='base400' css={{ mt: '$3' }}>
            If the authentication process fails on the authentication app,
            restart the process. {/*<Link to='/2fa/learn-more'>*/}
            {/*  <Text color='secondary400' css={{ display: 'inline' }}>*/}
            {/*    Learn more*/}
            {/*  </Text>*/}
            {/*</Link>.*/}
          </TextGroupSubheading>
        </TextGroup>
        <FormControl>
          <FormControl.Label>Code</FormControl.Label>
          <Input value={value} onChange={handleOnChange} />
          {data && !data.enableTwoFA.status && (
            <FormControl.ErrorText>
              {data.enableTwoFA.message}
            </FormControl.ErrorText>
          )}
        </FormControl>
      </VStack>
      <Button
        isLoading={loading}
        loadingText={loading ? '' : 'Confirming'}
        onClick={() => enableTwoFA(value, onContinue)}
        fullWidth
        className={extraBtnPadding()}
      >
        Confirm
      </Button>
    </>
  );
}

function AppRegistrationStepper({ onClose }: { onClose: VoidFunction }) {
  const { count: step, increment, reset } = useCounter();
  // TODO: Pass error to a global error context provider
  const [register, { loading, error, data }] = useMutation<{
    twoFAAppRegistration: TwoFAAppRegistrationModel;
  }>(TWO_FA_APP_REGISTRATION);

  return (
    <Stepper currentStep={step}>
      <Stepper.Step step={0}>
        <TwoFAAppStep1
          onContinue={async () => {
            await register();
            if (!error) increment();
          }}
        />
      </Stepper.Step>
      <Stepper.Step step={1}>
        <Loader loading={loading}>
          {data && (
            <TwoFAAppStep2
              onContinue={increment}
              data={data.twoFAAppRegistration}
            />
          )}
        </Loader>
      </Stepper.Step>
      <Stepper.Step step={2}>
        <CodeStep
          onContinue={() => {
            reset();
            onClose();
          }}
        />
      </Stepper.Step>
    </Stepper>
  );
}

function TwoFACheckbox({
  name,
  isActive,
}: {
  name: TwoFAChannel;
  isActive: boolean;
}) {
  const { count: step, reset } = useCounter();
  const { switchState, turnOn, turnOff } = useSwitch();
  const { disableTwoFA } = useDisableTwoFA();

  const close = () => {
    reset();
    turnOff();
  };

  const Trigger = () => (
    <Checkbox
      checked={isActive}
      value={`${isActive}`}
      labelledBy={`heading__2fa-${name}`}
    />
  );

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={isActive}>
        <CommonAlertDialog
          heading='Disable Two Factor authentication'
          description='Removing this feature, will remove an extra layer of
                security for your account. Are you sure you want to disable
                it?'
          actionText='Yes, turn off'
          onAction={() => disableTwoFA(name)}
        >
          <Trigger />
        </CommonAlertDialog>
      </SwitchConditionalCase>

      <SwitchConditionalCase on={!isActive}>
        <Dialog isOpen={switchState} onOpen={turnOn} onClose={close}>
          <Dialog.Trigger>
            <Trigger />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content h='575px' maxWidth='600px'>
              <Dialog.Header />
              <Dialog.Body>
                <VStack justify='space-between' px={6} pb={6} flex={1}>
                  <SwitchConditional>
                    <SwitchConditionalCase on={name === 'app'}>
                      <AppRegistrationStepper onClose={turnOff} />
                    </SwitchConditionalCase>
                    <SwitchConditionalCase on={name === 'sms'}>
                      <Stepper currentStep={step}>
                        <Stepper.Step step={0}>
                          <TextGroup>
                            <TextGroupHeading size={5} weight={500}>
                              Coming soon
                            </TextGroupHeading>
                            <TextGroupSubheading>
                              We are currently working on making this
                              feature available to all our users
                            </TextGroupSubheading>
                          </TextGroup>

                          <Button
                            onClick={close}
                            fullWidth
                            className={extraBtnPadding()}
                          >
                            Close
                          </Button>
                        </Stepper.Step>
                      </Stepper>
                    </SwitchConditionalCase>
                  </SwitchConditional>
                </VStack>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}

function TwoFactorAuthSettingsPage() {
  const { loading, data, error } = useQuery<{ twoFAChannel: string }>(
    GET_TWO_FA_CHANNEL,
  );

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Two-factor authentication'
        description='Help protect your account from unauthorized access by
        requiring a second authentication method in addition to your Twitter
        password. You can choose a text message, authentication app, or security key'
        url={prefix(RootSettingsPath, Paths.setting.login_security)}
      />
      <Loader loading={loading}>
        <HeaderLayout
          title='Two-factor authentication'
          backLink={prefix(
            RootSettingsPath,
            Paths.setting.account_security,
          )}
        >
          {data && (
            <>
              <VStack gap={5}>
                <HStack px={4} gap={4} items='center'>
                  <TextGroup gap={1}>
                    <TextGroup.Heading id='heading__2fa-sms' size={3}>
                      Text Message
                    </TextGroup.Heading>
                    <TextGroup.Subheading size={2} color='base400'>
                      Logging into Holdr will prompt a text message to be
                      sent to your mobile device with an authentication
                      code
                    </TextGroup.Subheading>
                  </TextGroup>
                  <TwoFACheckbox
                    name='sms'
                    isActive={data.twoFAChannel === 'sms'}
                  />
                </HStack>
                <HStack px={4} items='center'>
                  <TextGroup gap={1}>
                    <TextGroup.Heading id='heading__2fa-app' size={3}>
                      Authentication app
                    </TextGroup.Heading>
                    <TextGroup.Subheading size={2} color='base400'>
                      Logging into Holdr will prompt an authentication code
                      to be sent to a mobile authentication app.
                    </TextGroup.Subheading>
                  </TextGroup>

                  <TwoFACheckbox
                    name='app'
                    isActive={data.twoFAChannel === 'app'}
                  />
                </HStack>
              </VStack>
              <VStack
                borderTop={2}
                borderColor='base100'
                gap={3}
                pb={2}
                mt={4}
                pt={4}
              >
                <Box px={4}>
                  <Heading
                    size={4}
                    weight={500}
                    css={{ fontSize: 'large' }}
                  >
                    Additional information
                  </Heading>
                </Box>
                <SettingButton
                  path={prefix(
                    RootSettingsPath,
                    Paths.setting.backup_code,
                  )}
                  heading='Back up codes'
                  subheading='Get access code that you can use when do not have access for your two factor authentication options.'
                />
              </VStack>
            </>
          )}
        </HeaderLayout>
      </Loader>
    </Error>
  );
}
TwoFactorAuthSettingsPage.displayName = 'TwoFactorAuthSettingsPage';

export default TwoFactorAuthSettingsPage;
