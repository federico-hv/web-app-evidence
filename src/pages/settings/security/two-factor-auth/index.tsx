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
import {
  Error,
  extraBtnPadding,
  GenericProps,
  Head,
  Loader,
  Paths,
  prefix,
  Stepper,
  StepperContext,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useAlertDialog,
  useCounter,
} from '../../../../shared';
import { useState } from 'react';
import {
  useEnableTwoFA,
  useRegisterTwoFAChannel,
  TwoFAChannel,
  useDisableTwoFA,
  GET_TWO_FA_CHANNEL,
  SettingItem,
  TwoFAAppRegistrationModel,
} from '../../../../features';
import { useQuery } from '@apollo/client';
import { RootSettingsPath } from '../root';
import pinCode from '../../../../assets/images/pin-code.png';
import qrCode from '../../../../assets/images/scan-qrcode.png';
import { HeaderLayout } from '../../../../layout';

function DialogFooterWrapper({ children }: GenericProps) {
  return (
    <Box
      l={0}
      px={{ '@bp3': 6, '@bp1': 4 }}
      h={80}
      w='100%'
      bgColor='primary400'
      position='fixed'
      b={0}
    >
      {children}
    </Box>
  );
}

function TwoFAAppStep1({ onContinue }: { onContinue?: VoidFunction }) {
  return (
    <VStack position='relative' gap={4}>
      <Heading size={{ '@bp1': 4, '@bp3': 5 }} weight={500}>
        Protect your account in two easy steps.
      </Heading>
      <VStack gap={6}>
        <HStack p={3} gap={4} bgColor='base100' radius={4}>
          <Box>
            <Image size={50} src={qrCode} />
          </Box>
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

        <HStack p={3} gap={4} bgColor='base100' radius={4}>
          <Box>
            <Image size={50} src={pinCode} />
          </Box>
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

      <DialogFooterWrapper>
        <Button
          onClick={onContinue}
          fullWidth
          className={extraBtnPadding()}
        >
          Begin Setup
        </Button>
      </DialogFooterWrapper>
    </VStack>
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
      <DialogFooterWrapper>
        <Button
          onClick={onContinue}
          fullWidth
          className={extraBtnPadding()}
        >
          Next
        </Button>
      </DialogFooterWrapper>
    </>
  );
}

function CodeStep({ onContinue }: { onContinue: VoidFunction }) {
  // TODO: Pass error to a global error profile provider
  const { loading, data, enableTwoFA } = useEnableTwoFA();

  const { value, handleOnChange } = useInputChange('');

  return (
    <>
      <VStack gap={6}>
        <TextGroup>
          <TextGroupHeading size={5} weight={500}>
            Enter the confirmation code
          </TextGroupHeading>
          <TextGroupSubheading>
            Follow the instructions on the authentication app. Once the
            authentication app generates a code enter it here.
          </TextGroupSubheading>
          <TextGroupSubheading
            size={2}
            color='base400'
            weight={500}
            css={{ mt: '$3' }}
          >
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
      <DialogFooterWrapper>
        <Button
          isLoading={loading}
          loadingText={loading ? '' : 'Confirming'}
          onClick={() => enableTwoFA(value, onContinue)}
          fullWidth
          className={extraBtnPadding()}
        >
          Confirm
        </Button>
      </DialogFooterWrapper>
    </>
  );
}

function AppRegistrationStepper({ onClose }: { onClose: VoidFunction }) {
  const { register, loading, error, data } = useRegisterTwoFAChannel();
  // TODO: Pass error to a global error profile provider

  return (
    <Stepper>
      <Stepper.Step step={0}>
        <StepperContext.Consumer>
          {({ increment }) => (
            <TwoFAAppStep1
              onContinue={async () => {
                await register();
                if (!error) increment();
              }}
            />
          )}
        </StepperContext.Consumer>
      </Stepper.Step>
      <Stepper.Step step={1}>
        <StepperContext.Consumer>
          {({ increment }) => (
            <Loader loading={loading}>
              {data && (
                <TwoFAAppStep2
                  onContinue={increment}
                  data={data.twoFAAppRegistration}
                />
              )}
            </Loader>
          )}
        </StepperContext.Consumer>
      </Stepper.Step>
      <Stepper.Step step={2}>
        <StepperContext.Consumer>
          {({ reset }) => (
            <CodeStep
              onContinue={() => {
                reset();
                onClose();
              }}
            />
          )}
        </StepperContext.Consumer>
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

  const { openWith } = useAlertDialog();

  const close = () => {
    reset();
    turnOff();
  };

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={isActive}>
        <Checkbox
          checked={isActive}
          value={`${isActive}`}
          labelledBy={`heading__2fa-${name}`}
          onClick={() =>
            openWith({
              title: 'Disable Two Factor authentication',
              description:
                'Removing this feature, will remove an extra layer of security for your account. Are you sure you want to disable it?',

              actionText: 'Turn off',
              onAction: () => disableTwoFA(name),
            })
          }
        />
      </SwitchConditionalCase>

      <SwitchConditionalCase on={!isActive}>
        <Dialog isOpen={switchState} onOpen={turnOn} onClose={close}>
          <Dialog.Trigger>
            <Checkbox
              checked={isActive}
              value={`${isActive}`}
              labelledBy={`heading__2fa-${name}`}
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content
              t={{ '@bp1': 69, '@bp3': '50%' }}
              h={{ '@bp1': '100vh', '@bp3': 575 }}
              maxHeight={{ '@bp1': '100vh', '@bp3': '600px' }}
              radius={{ '@bp1': 0, '@bp3': 3 }}
              w={{ '@bp1': '100vw', '@bp3': '90vw' }}
            >
              <Dialog.Header borderBottom={2} borderColor='base100' />
              <Dialog.Body>
                <VStack
                  justify='space-between'
                  px={{ '@bp3': 6, '@bp1': 3 }}
                  py={4}
                  flex={1}
                  position='relative'
                >
                  <SwitchConditional>
                    <SwitchConditionalCase on={name === 'app'}>
                      <AppRegistrationStepper onClose={turnOff} />
                    </SwitchConditionalCase>
                    <SwitchConditionalCase on={name === 'sms'}>
                      <Stepper defaultStep={step}>
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
                          <DialogFooterWrapper>
                            <Button
                              onClick={close}
                              fullWidth
                              className={extraBtnPadding()}
                            >
                              Close
                            </Button>
                          </DialogFooterWrapper>
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
              {data && data.twoFAChannel && (
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
                  <SettingItem
                    path={prefix(
                      RootSettingsPath,
                      Paths.setting.backup_code,
                    )}
                    heading='Back up codes'
                    subheading='Get access code that you can use when do not have access for your two factor authentication options.'
                  />
                </VStack>
              )}
            </>
          )}
        </HeaderLayout>
      </Loader>
    </Error>
  );
}
TwoFactorAuthSettingsPage.displayName = 'TwoFactorAuthSettingsPage';

export default TwoFactorAuthSettingsPage;
