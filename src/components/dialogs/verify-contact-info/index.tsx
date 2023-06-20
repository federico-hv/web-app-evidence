import { AlertDialog, Button, Heading } from '@holdr-ui/react';
import { VerifyContactInfoDialogProps } from './verify-contact-info.type';

import { extraBtnPadding } from '../../../shared';
import { useFormikContext } from 'formik';
import { isInputDisabled } from '../../../utilities';

export interface IVerifyContactInfo {
  phone?: string;
  email?: string;
  channel: 'sms' | 'email';
}
function VerifyContactInfoDialog({
  onContinue,
  loading,
}: VerifyContactInfoDialogProps) {
  const { values, errors } = useFormikContext<IVerifyContactInfo>();
  // disabled = isEqual(values.phone, phone)

  const value = values.phone;

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          disabled={isInputDisabled(values, errors, ['phone'])}
          type='button'
          fullWidth
          className={extraBtnPadding()}
        >
          Continue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>
            <Heading as='h4' size={3} casing='capitalize'>
              Verification code
            </Heading>
          </AlertDialog.Title>
          <AlertDialog.Description>
            We will send you a verification code to {value}. Standard SMS,
            call and data fees may apply.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel variant='ghost' disabled={loading}>
              Edit
            </AlertDialog.Cancel>
            <AlertDialog.Action
              isLoading={loading}
              loadingText={loading ? '' : 'Sending'}
              onClick={() => onContinue(value as string, 'sms')}
            >
              Continue
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
VerifyContactInfoDialog.displayName = 'VerifyContactInfoDialog';

export default VerifyContactInfoDialog;
