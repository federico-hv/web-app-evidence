export interface VerifyContactInfoDialogProps {
  onContinue: (value: string, channel: 'sms' | 'email') => Promise<void>;
  loading?: boolean;
}
