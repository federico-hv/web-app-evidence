import {
  Box,
  GeneralContextProvider,
  Heading,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import { Stepper, StepperStep } from '../../../../shared';
import { useAccountInfoSuspenseQuery } from '../../../../features';
import { IUpdateEmail } from './shared';
import { ChangeEmailStep } from './shared';
import {
  ChangeEmailOverviewStep,
  ChangeEmailVerificationStep,
  ChangeEmailUpdateStep,
} from './ui';

function ChangeEmailPage() {
  const { data } = useAccountInfoSuspenseQuery();

  const [state, update] = useRecordState<IUpdateEmail>({
    email: data.accountInfo.email,
  });

  return (
    <GeneralContextProvider value={{ state, update }}>
      <VStack
        h={600}
        gap={4}
        divider={
          <Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />
        }
      >
        <Box px={5} pt={5}>
          <Heading size={6} weight={500}>
            Change Email
          </Heading>
        </Box>
        <Stepper>
          <StepperStep step={ChangeEmailStep.Overview}>
            <ChangeEmailOverviewStep />
          </StepperStep>
          <StepperStep step={ChangeEmailStep.Update}>
            <ChangeEmailUpdateStep />
          </StepperStep>
          <StepperStep step={ChangeEmailStep.Verification}>
            <ChangeEmailVerificationStep />
          </StepperStep>
        </Stepper>
      </VStack>
    </GeneralContextProvider>
  );
}

export default ChangeEmailPage;
