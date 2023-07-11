import { useState } from 'react';
import {
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
  Stepper,
  StepperStep,
} from '../../../shared';
import {
  ChangeContactInfoContextProvider,
  useAccountInfo,
} from '../../../features';
import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import {
  ChangeContactInfoDialog,
  ChangeContactInfoDialogBody,
  ContactVerificationForm,
  OTPVerificationForm,
} from '../../../../v1/components';

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
          <HStack justify='flex-end' p={4}>
            <ChangeContactInfoDialog
              isOpen={switchState}
              onOpen={turnOn}
              onClose={close}
              name='email'
              value={data.email}
            >
              <ChangeContactInfoContextProvider
                value={{ email: state, update, name: 'email', close }}
              >
                <Stepper defaultStep={0}>
                  <StepperStep step={0}>
                    <VStack gap={5} px={3} py={6} h='full'>
                      <ChangeContactInfoDialogBody
                        name='email'
                        value={data.email}
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
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;
