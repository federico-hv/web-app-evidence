import { ReactNode, useContext, useState } from 'react';
import { HeaderLayout } from 'layouts';
import {
  ChangeContactInfoDialog,
  ContactVerificationForm,
  Head,
  Stepper,
  StepperStep,
  ChangeContactInfoDialogBody,
  OTPVerificationForm,
  CommonAlertDialog,
} from 'components';
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
  VStack,
  Text,
  useSwitch,
  Button,
} from '@holdr-ui/react';
import { useCounter } from '../../../hooks';
import { Paths } from '../../../shared';
import { useMutation } from '@apollo/client';
import { DELETE_PHONE_NUMBER, GET_ACCOUNT_INFO } from '../../../lib';

export function ContactDialogWrapper({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <VStack gap={5} px={3} py={6} h='full'>
      {children}
    </VStack>
  );
}

export function useDeletePhoneNumber() {
  const [deletePhoneNumber, { loading, error }] = useMutation(
    DELETE_PHONE_NUMBER,
  );

  const onSubmit = async () => {
    await deletePhoneNumber({
      update: (cache) => {
        cache.modify({
          fields: {
            accountInfo(current) {
              cache.writeQuery({
                query: GET_ACCOUNT_INFO,
                data: { ...current, phone: '' },
              });
            },
          },
        });
      },
    });
  };

  return { loading, error, onSubmit };
}

function PhoneSettingPage() {
  const { count: step, increment, decrement, reset } = useCounter();
  const { data } = useContext(AccountInfoContext);
  const [state, set] = useState(data.phone);
  const { switchState, turnOn, turnOff } = useSwitch();
  const { onSubmit } = useDeletePhoneNumber();
  const close = () => {
    turnOff();
    reset();
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
              <CommonAlertDialog
                heading='Delete phone number'
                description='Once you delete the phone number,
                  you will no longer receive login codes via the phone number.'
                actionText='Yes, Delete Number'
                onAction={onSubmit}
              >
                <Button
                  label='Delete'
                  variant='ghost'
                  colorTheme='danger'
                />
              </CommonAlertDialog>
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
                <StepperContextProvider
                  value={{ increment, decrement, step }}
                >
                  <Stepper currentStep={step}>
                    <StepperStep step={0}>
                      <ContactDialogWrapper>
                        <ChangeContactInfoDialogBody
                          name='phone number'
                          value={data.phone}
                        />
                        <ContactVerificationForm />
                      </ContactDialogWrapper>
                    </StepperStep>
                    <StepperStep step={1}>
                      <ContactDialogWrapper>
                        <Text>
                          Enter the code that you was sent to{' '}
                          <Text weight={500} css={{ display: 'inline' }}>
                            {state}
                          </Text>
                          .
                        </Text>
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
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
