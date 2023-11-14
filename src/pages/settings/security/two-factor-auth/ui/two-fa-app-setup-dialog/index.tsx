import { HStack, Icon, Text, VStack } from '@holdr-ui/react';
import {
  arrayFrom,
  CommonDialog,
  CommonDialogActionButton,
  CommonDialogContent,
  CommonDialogTrigger,
  GeneralContextProvider,
  StepIndicator,
  StepperIndicatorStep,
  useCounter,
  useDialogContext,
  useRecordState,
} from '../../../../../../shared';
import InfoStep from './info-step';
import ScanCodeStep from './scan-code-step';
import VerifyCodeStep from './verify-code-step';
import {
  TwoFAAppRegistrationModel,
  useEnableTwoFA,
  useRegisterTwoFAChannel,
} from '../../../../../../features';

export interface ITwoFASetupContext extends TwoFAAppRegistrationModel {
  userCode: string;
}

function TwoFAAppSetupDialog() {
  const { register, loading } = useRegisterTwoFAChannel();
  const { loading: loading1, enableTwoFA } = useEnableTwoFA();
  const [state, update] = useRecordState<ITwoFASetupContext>({
    qrCodeUrl: '',
    code: '',
    userCode: '',
  });
  const { count: step, increment, reset } = useCounter(0);
  const ctx = useDialogContext();

  return (
    <CommonDialog
      {...ctx}
      minHeight={550}
      onClose={() => {
        ctx.onClose();
        reset();
      }}
    >
      <CommonDialogTrigger></CommonDialogTrigger>
      <CommonDialogContent>
        <VStack
          py={4}
          px={{ '@bp1': 3, '@bp3': 6 }}
          h='100%'
          justify='space-between'
        >
          <GeneralContextProvider
            value={{
              state,
              update,
            }}
          >
            {step === 0 && <InfoStep />}
            {step === 1 && <ScanCodeStep />}
            {step === 2 && <VerifyCodeStep />}
          </GeneralContextProvider>
          <VStack gap={4}>
            {step === 2 && (
              <HStack
                items={{ '@bp1': 'flex-start', '@bp3': 'center' }}
                gap={2}
              >
                <Icon
                  size='sm'
                  color='base400'
                  name='information-outline'
                />
                <Text size={1} color='base400'>
                  Restart the process if it fails to connect and you have
                  entered the correct code.
                </Text>
              </HStack>
            )}
            <StepIndicator current={step}>
              {arrayFrom(2).map((idx) => (
                <StepperIndicatorStep key={idx} />
              ))}
            </StepIndicator>
          </VStack>
        </VStack>
      </CommonDialogContent>
      {step === 0 && (
        <CommonDialogActionButton
          loading={loading}
          label='Setup'
          onClick={async () => {
            const result = await register();

            if (result.data) {
              update({
                qrCodeUrl: result.data.twoFAAppRegistration.qrCodeUrl,
                code: result.data.twoFAAppRegistration.code,
              });
            }

            increment();
          }}
        />
      )}
      {step === 1 && (
        <CommonDialogActionButton label='Continue' onClick={increment} />
      )}
      {step === 2 && (
        <CommonDialogActionButton
          loading={loading1}
          disabled={state.userCode.length < 1}
          label='Confirm'
          onClick={async () => {
            const result = await enableTwoFA(state.userCode);

            if (result.data && result.data.enableTwoFA.status) {
              ctx.onClose();
            }
          }}
        />
      )}
    </CommonDialog>
  );
}
TwoFAAppSetupDialog.displayName = 'TwoFAAppSetupDialog';

export default TwoFAAppSetupDialog;
