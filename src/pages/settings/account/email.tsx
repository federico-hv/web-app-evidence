import { useContext, useState } from 'react';
import { HeaderLayout } from 'layouts';
import {
  Head,
  ChangeContactInfoDialog,
  Stepper,
  StepperStep,
  ChangeContactInfoDialogBody,
  ContactVerificationForm,
  OTPVerificationForm,
} from 'components';
import { Paths } from 'shared';
import {
  AccountInfoContext,
  ChangeContactInfoContextProvider,
  StepperContextProvider,
} from 'contexts';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';
import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { useCounter } from '../../../hooks';
import { ContactDialogWrapper } from './phone';

function EmailSettingPage() {
  const { count: step, increment, decrement, reset } = useCounter();
  const { data } = useContext(AccountInfoContext);
  const [state, set] = useState(data.email);
  const { switchState, turnOn, turnOff } = useSwitch();
  const close = () => {
    turnOff();
    reset();
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
                <StepperContextProvider
                  value={{ increment, decrement, step }}
                >
                  <Stepper currentStep={step}>
                    <StepperStep step={0}>
                      <ContactDialogWrapper>
                        <ChangeContactInfoDialogBody
                          name='email'
                          value={data.email}
                        />
                        <ContactVerificationForm />
                      </ContactDialogWrapper>
                    </StepperStep>
                    <StepperStep step={1}>
                      <ContactDialogWrapper>
                        <Text>Enter the code that you was sent to .</Text>
                        <OTPVerificationForm />
                      </ContactDialogWrapper>
                    </StepperStep>
                  </Stepper>
                </StepperContextProvider>
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
