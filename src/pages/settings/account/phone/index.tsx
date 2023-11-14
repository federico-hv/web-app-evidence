import { useState } from 'react';
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
import {
  DialogHeading,
  Head,
  Paths,
  prefix,
  RootSettingsPath,
  Stepper,
  StepperStep,
  useAlertDialog,
} from '../../../../shared';
import {
  ChangeContactInfoContextProvider,
  ContactInfoText,
  ContactVerificationForm,
  getHeading,
  OTPVerificationForm,
  useAccountInfo,
  useDeletePhoneNumber,
} from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function DeletePhoneNumber() {
  const { onSubmit } = useDeletePhoneNumber();
  const { openWith } = useAlertDialog();

  return (
    <Button
      label='Delete'
      variant='ghost'
      colorTheme='danger'
      onClick={() =>
        openWith({
          title: 'Delete phone number',
          description:
            'Once you delete the phone number, you will no longer receive login codes via the phone number.',
          actionText: 'Yes, Delete Number',
          onAction: onSubmit,
        })
      }
    />
  );
}

function PhoneSettingPage() {
  const { data } = useAccountInfo();
  const [state, set] = useState(data.phone);
  const { switchState, turnOn, turnOff } = useSwitch();

  const close = () => {
    turnOff();
    set(data.phone);
  };
  const update = (value: string) => set(value);
  return (
    <>
      <Head
        title='Change phone number'
        description='Change your phone number.'
        url={`${Paths.settings}/${Paths.setting.phone}`}
      />
      <SettingsHeaderLayout
        title='Phone'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <VStack>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <Box css={{ opacity: 0.5 }}>
              <FormControl disabled>
                <FormControl.Label>Phone</FormControl.Label>
                <Input
                  defaultValue={data.phone}
                  css={{ 'user-select': 'none' }}
                />
              </FormControl>
            </Box>
          </Box>
          <HStack justify='flex-end' p={4} gap={4}>
            {data.phone && <DeletePhoneNumber />}
            <ChangeContactInfoContextProvider
              value={{
                phone: state,
                update,
                name: 'phone',
                close: close,
              }}
            >
              <Dialog
                isOpen={switchState}
                onOpen={turnOn}
                onClose={turnOff}
                ariaDescribedBy='phone-dialog__title'
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
                        title={getHeading('phone number', data.phone)}
                        id='phone-dialog__title'
                      />
                    </Dialog.Header>
                    <Dialog.Body>
                      <Stepper>
                        <StepperStep step={0}>
                          <VStack gap={5} px={3} py={6} h='full'>
                            <ContactInfoText
                              type='phone number'
                              value={data.phone}
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
      </SettingsHeaderLayout>
    </>
  );
}
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
