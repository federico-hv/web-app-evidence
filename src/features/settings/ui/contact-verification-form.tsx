import { Formik, useFormikContext } from 'formik';
import { Button, VStack, Alert } from '@holdr-ui/react';
import { FormEvent, useContext } from 'react';
import {
  extraBtnPadding,
  FormInput,
  isInputDisabled,
  StepperContext,
  useAlertDialog,
} from '../../../shared';
import {
  AccountInfoContext,
  ChangeContactInfoContext,
  ContactVerificationSchema,
  IVerifyContactInfo,
  useSendVerificationOTP,
} from '../shared';
import phones from '../../../assets/json/phone.code.json';

function VerifyPhoneAlertDialog({
  onAction,
}: {
  onAction: (value: string, channel: 'sms' | 'email') => Promise<void>;
}) {
  const { values, errors } = useFormikContext<IVerifyContactInfo>();
  // disabled = isEqual(values.phone, phone)

  const value = values.phone;

  const { openWith } = useAlertDialog();

  return (
    <Button
      disabled={isInputDisabled(values, errors, ['phone'])}
      type='button'
      fullWidth
      className={extraBtnPadding()}
      onClick={() =>
        openWith({
          title: 'Verification code',
          description: `We will send you a verification code to ${value}. Standard SMS call and data fees may apply.`,
          cancelText: 'Edit',
          actionText: 'Continue',
          onAction: () => onAction(value as string, 'sms'),
        })
      }
    >
      Continue
    </Button>
  );
}

const Channel: Record<'email' | 'phone', string> = {
  email: 'email',
  phone: 'sms',
};

function ContactVerificationForm() {
  const { increment } = useContext(StepperContext);
  const { name, update } = useContext(ChangeContactInfoContext);
  const { data } = useContext(AccountInfoContext);

  const currentPhone = phones.find(
    ({ name }) => name.toLowerCase() === data.country.toLowerCase(),
  );

  const { onSubmit, error } = useSendVerificationOTP();

  const handleContinue = async (
    value: string,
    channel: 'sms' | 'email' = 'sms',
  ) => {
    await onSubmit({
      contact: value,
      channel: channel,
    });
    if (!error) {
      update(value);
      increment();
    }
  };

  return (
    <Formik
      initialValues={{
        phone: '',
        email: '',
        channel: Channel[name],
      }}
      validationSchema={ContactVerificationSchema}
      onSubmit={() => {
        //nothing
      }}
    >
      {({ values, handleSubmit, errors }) => (
        <VStack
          as='form'
          h='full'
          justify='space-between'
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
        >
          <VStack gap={3}>
            {error && error.message && (
              <Alert status='danger' variant='subtle'>
                <Alert.Content>
                  <Alert.Description>{error.message}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}
            {name === 'phone' && (
              <FormInput
                prefix={currentPhone ? currentPhone.dial_code : ''}
                name='phone'
                type='phone'
              />
            )}
            {name === 'email' && (
              <FormInput name='email' type='email' label='email' />
            )}
          </VStack>
          {name === 'phone' && (
            <VerifyPhoneAlertDialog onAction={handleContinue} />
          )}
          {name === 'email' && (
            <Button
              type='button'
              disabled={isInputDisabled(values, errors, ['email'])}
              fullWidth
              className={extraBtnPadding()}
              onClick={async () =>
                handleContinue(values.email as string, 'email')
              }
            >
              Continue
            </Button>
          )}
        </VStack>
      )}
    </Formik>
  );
}
ContactVerificationForm.displayName = 'ContactVerificationForm';

export default ContactVerificationForm;
