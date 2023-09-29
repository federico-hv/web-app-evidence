import { useState } from 'react';
import {
  DialogHeading,
  Head,
  Paths,
  prefix,
  RootSettingsPath,
  Stepper,
  StepperStep,
} from '../../../../shared';
import {
  ChangeContactInfoContextProvider,
  ContactInfoText,
  ContactVerificationForm,
  getHeading,
  OTPVerificationForm,
  useAccountInfo,
} from '../../../../features';
import {
  Box,
  Button,
  Dialog,
  FormControl,
  HStack,
  Input,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { HeaderLayout } from '../../../../layout';

function EmailSettingPage() {
  const { data } = useAccountInfo();
  const [state, set] = useState(data.email);
  const { switchState, turnOn, turnOff } = useSwitch();
  const close = () => {
    turnOff();
    set(data.email);
  };
  const update = (value: string) => set(value);

  return (
    <>
      <Head
        title='Change email'
        description='Change your email address.'
        url={`${Paths.settings}/${Paths.setting.email}`}
      />
      <HeaderLayout
        title='Email'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <VStack>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <Box css={{ opacity: 0.5 }}>
              <FormControl disabled>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  defaultValue={data.email}
                  css={{ 'user-select': 'none' }}
                />
              </FormControl>
            </Box>
          </Box>
          <HStack justify='flex-end' p={4} gap={4}>
            <ChangeContactInfoContextProvider
              value={{
                email: state,
                update,
                name: 'email',
                close: close,
              }}
            >
              <Dialog
                isOpen={switchState}
                onOpen={turnOn}
                onClose={turnOff}
                ariaDescribedBy='email-dialog__title'
              >
                <Dialog.Trigger>
                  <Button>Update</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content
                    t={{ '@bp1': 69, '@bp3': '50%' }}
                    h={{ '@bp1': '100vh', '@bp3': 450 }}
                    maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
                    radius={{ '@bp1': 0, '@bp3': 3 }}
                    w={{ '@bp1': '100vw', '@bp3': '90vw' }}
                  >
                    <Dialog.Header borderBottom={2} borderColor='base100'>
                      <DialogHeading
                        title={getHeading('email', data.email)}
                        id='email-dialog__title'
                      />
                    </Dialog.Header>
                    <Dialog.Body>
                      <Stepper>
                        <StepperStep step={0}>
                          <VStack gap={5} px={3} py={6} h='full'>
                            <ContactInfoText
                              type='email'
                              value={data.email}
                            />
                            <ContactVerificationForm />
                          </VStack>
                        </StepperStep>
                        <StepperStep step={1}>
                          <VStack gap={5} px={3} py={6} h='full'>
                            <Text>
                              Enter the code that you was sent to{' '}
                              <Text
                                weight={500}
                                css={{ display: 'inline' }}
                              >
                                {state}
                              </Text>
                              .
                            </Text>
                            <OTPVerificationForm />
                          </VStack>
                        </StepperStep>
                      </Stepper>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog>
            </ChangeContactInfoContextProvider>
          </HStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;
