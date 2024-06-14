import {
  StripeConnectOnboarding,
  useOnboardingConnectInstance,
} from '../../../../../features';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@holdr-ui/react';
import { voidFn } from '../../../../../shared';

function OnboardingFormDialog(props: {
  onClose: VoidFunction;
  onOpen: VoidFunction;
  isOpen: boolean;
}) {
  const { connectInstance } = useOnboardingConnectInstance();

  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay zIndex={25} />
        <DialogContent
          minWidth={600}
          h={800}
          maxHeight='90vh'
          zIndex={25}
          bgColor='#30304B'
          overflow='auto'
        >
          <DialogBody py={4}>
            {connectInstance && (
              <StripeConnectOnboarding
                connectInstance={connectInstance}
                onExit={voidFn}
              />
            )}
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
OnboardingFormDialog.displayName = 'OnboardingFormDialog';

export default OnboardingFormDialog;
