import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import {
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
  Stepper,
  StepperStep,
  useAlertDialog,
} from '../../../shared';
import {
  ChangeContactInfoContextProvider,
  ContactVerificationForm,
  OTPVerificationForm,
  useAccountInfo,
  useDeletePhoneNumber,
} from '../../../features';
import {
  ChangeContactInfoDialog,
  ChangeContactInfoDialogBody,
} from '../../../../v1/components';

function PhoneSettingPage() {
  const { data } = useAccountInfo();
  const [state, set] = useState(data.phone);
  const { switchState, turnOn, turnOff } = useSwitch();
  const { onSubmit } = useDeletePhoneNumber();

  const { open: openAlertDialog } = useAlertDialog({
    title: 'Delete phone number',
    description:
      'Once you delete the phone number, you will no longer receive login codes via the phone number.',
    actionText: 'Yes, Delete Number',
    onAction: onSubmit,
  });

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
      <HeaderLayout
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
            {data.phone && (
              <Button
                label='Delete'
                variant='ghost'
                colorTheme='danger'
                onClick={openAlertDialog}
              />
            )}
            <ChangeContactInfoDialog
              isOpen={switchState}
              onOpen={turnOn}
              onClose={close}
              name='phone number'
              value={data.phone}
            >
              <ChangeContactInfoContextProvider
                value={{
                  phone: state,
                  update,
                  name: 'phone',
                  close: close,
                }}
              >
                <Stepper>
                  <StepperStep step={0}>
                    <VStack gap={5} px={3} py={6} h='full'>
                      <ChangeContactInfoDialogBody
                        name='phone number'
                        value={data.phone}
                      />
                      <ContactVerificationForm />
                    </VStack>
                  </StepperStep>
                  <StepperStep step={1}>
                    <VStack gap={5} px={3} py={6} h='full'>
                      <Text>
                        Enter the code that you was sent to{' '}
                        <Text weight={500} css={{ display: 'inline' }}>
                          {state}
                        </Text>
                        .
                      </Text>
                      <OTPVerificationForm />
                    </VStack>
                  </StepperStep>
                </Stepper>
              </ChangeContactInfoContextProvider>
            </ChangeContactInfoDialog>
          </HStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
