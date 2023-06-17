import { ReactNode, useContext } from 'react';
import { HeaderLayout } from 'layouts';
import { Error, Head, Stepper, StepperStep } from 'components';
import { Paths } from 'shared';
import { isEqual, pick } from 'lodash';
import {
  AccountInfoContext,
  AccountInfoFormContextProvider,
} from 'contexts';
import { useUpdateAccountInfo } from 'lib';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';
import {
  Box,
  Button,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
  Select,
  useSwitch,
} from '@holdr-ui/react';
import phoneCodes from '../../../assets/json/phone.code.json';
import { useCounter } from '../../../hooks';

interface ContactDialogProps {
  name: string;
  value?: string;
}

function ContactDialogHeader({ name, value }: ContactDialogProps) {
  return (
    <>
      {value ? (
        <Heading as='h3' size={3}>
          Change {name}
        </Heading>
      ) : (
        <Heading as='h3' size={3}>
          Add {name}
        </Heading>
      )}
    </>
  );
}

function ContactDialogBody({ name, value }: ContactDialogProps) {
  return (
    <>
      {value ? (
        <VStack>
          <Text size={2} color='base400'>
            Your current {name} is {value}. What would you like to change
            it to?
          </Text>
          <Text size={2} color='base400'>
            Your {name} is not publicly available on Holdr.
          </Text>
        </VStack>
      ) : (
        <VStack>
          <Text size={2} color='base400'>
            Enter the {name} you would like to link to your Holdr account.
          </Text>
          <Text size={2} color='base400'>
            You will receive a verification code on this {name}.
          </Text>
        </VStack>
      )}
    </>
  );
}

function ContactDialogWrapper({
  children,
}: ContactDialogProps & { children?: ReactNode }) {
  return (
    <VStack gap={5} px={3} py={6}>
      {children}
    </VStack>
  );
}

function PhoneSettingPage() {
  const { data } = useContext(AccountInfoContext);
  const {
    loading: loadingMutation,
    error: errorMutation,
    // onSubmit,
    // onFinish,
  } = useUpdateAccountInfo();
  const { count, increment, reset } = useCounter();
  const { switchState, turnOn, turnOff } = useSwitch();

  const close = () => {
    turnOff();
    reset();
  };

  return (
    <Error
      hasError={!!errorMutation}
      errorMessage={errorMutation?.message}
    >
      <Head
        title='Update phone'
        description='Change your phone number.'
        url={`${Paths.settings}/${Paths.setting.phone}`}
      />
      <HeaderLayout
        title='Phone'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <AccountInfoFormContextProvider
          value={{
            loading: loadingMutation,
            disabled: (values) => isEqual(values, pick(data, 'phone')),
            data: data,
            name: 'phone',
          }}
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
            <HStack justify='flex-end' p={4}>
              <Dialog isOpen={switchState} onOpen={turnOn} onClose={close}>
                <Dialog.Trigger>
                  <Button>Update</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content>
                    <Dialog.Header borderBottom={2} borderColor='base100'>
                      <HStack
                        flex={1}
                        justify='space-between'
                        items='center'
                      >
                        <ContactDialogHeader
                          name='phone number'
                          value={data.phone}
                        />
                        {count === 0 && (
                          <Button onClick={increment}>Next</Button>
                        )}
                        {count === 1 && (
                          <Button onClick={close}>Finish</Button>
                        )}
                      </HStack>
                    </Dialog.Header>
                    <Dialog.Body direction='vertical'>
                      <Stepper currentStep={count}>
                        <StepperStep step={0}>
                          <ContactDialogWrapper
                            value={data.phone}
                            name='phone number'
                          >
                            <ContactDialogBody
                              name='phone number'
                              value={data.phone}
                            />
                            <VStack gap={3}>
                              <Select>
                                {phoneCodes.map((phone) => (
                                  <option key={phone.code}>
                                    {phone.dial_code} {phone.name}
                                  </option>
                                ))}
                              </Select>
                              <Input
                                css={{
                                  'user-select': 'none',
                                }}
                              />
                            </VStack>
                          </ContactDialogWrapper>
                        </StepperStep>
                        <StepperStep step={1}>
                          <ContactDialogWrapper
                            value={data.phone}
                            name='phone number'
                          >
                            <Text size={2} color='base400'>
                              Enter the code that you was sent to the phone
                              {data.phone}.
                            </Text>
                            <Input
                              css={{
                                'user-select': 'none',
                              }}
                            />
                          </ContactDialogWrapper>
                        </StepperStep>
                      </Stepper>
                    </Dialog.Body>
                    <Dialog.Footer></Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog>
            </HStack>
          </VStack>
        </AccountInfoFormContextProvider>
      </HeaderLayout>
    </Error>
  );
}
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;
