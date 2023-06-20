import { Formik } from 'formik';
import { Button, VStack, Alert } from '@holdr-ui/react';
import { FormInput } from '../../inputs';
import { useContext } from 'react';
import {
  AccountInfoContext,
  ChangeContactInfoContext,
  StepperContext,
} from '../../../contexts';
import { VerifyContactInfoDialog } from '../../dialogs';
import { extraBtnPadding } from '../../../shared';
import phones from 'assets/json/phone.code.json';
import { ContactVerificationSchema } from './contact-verification.schema';
import { useSendVerificationOTP } from '../../../lib';

const Channel: Record<'email' | 'phone', string> = {
  email: 'email',
  phone: 'sms',
};

function ContactVerificationForm() {
  const { increment } = useContext(StepperContext);
  const { name, phone, email, update } = useContext(
    ChangeContactInfoContext,
  );
  const { data } = useContext(AccountInfoContext);

  const currentPhone = phones.find(
    ({ name }) => name.toLowerCase() === data.country.toLowerCase(),
  );
  const { onSubmit, loading, error } = useSendVerificationOTP();

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
        phone: phone,
        email: email,
        channel: Channel[name],
      }}
      validationSchema={ContactVerificationSchema}
      onSubmit={(_, { resetForm }) => {
        resetForm();
      }}
    >
      <VStack as='form' h='full' justify='space-between'>
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
          <VerifyContactInfoDialog
            loading={loading}
            onContinue={handleContinue}
          />
        )}
        {name === 'email' && (
          <Button
            fullWidth
            className={extraBtnPadding()}
            onClick={increment}
          >
            Continue
          </Button>
        )}
      </VStack>
    </Formik>
  );
}
ContactVerificationForm.displayName = 'ContactVerificationForm';

export default ContactVerificationForm;
