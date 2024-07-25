import { CloseButton, Dialog, HStack } from '@holdr-ui/react';

export interface Disclosure {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

function LiveBidsDialog({
  disclosure,
  contentProps,
  bodyChild,
}: {
  contentProps: any;
  disclosure: Disclosure;
  bodyChild: React.ReactNode;
}) {
  return (
    <Dialog {...disclosure} ariaDescribedBy='dialog-with-custom-close'>
      <Dialog.Portal>
        <Dialog.Overlay bgColor='darkTint400' />
        <Dialog.Content {...contentProps}>
          <Dialog.Header css={{ zIndex: 100 }}>
            <HStack justify='flex-end' flex={1} minHeight={'44px'}>
              <Dialog.Close>
                <CloseButton
                  type='button'
                  variant='ghost'
                  colorTheme='white500'
                  size={'sm'}
                />
              </Dialog.Close>
            </HStack>
          </Dialog.Header>
          <Dialog.Body px={'64px'}>{bodyChild}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default LiveBidsDialog;
