import { Button, Dialog, HStack } from '@holdr-ui/react';
import { ChangeContactInfoDialogProps } from './change-contact-info.type';
import { ChangeContactInfoHeader } from './support';

function ChangeContactInfoDialog({
  name,
  onOpen,
  isOpen,
  value,
  onClose,
  children,
}: ChangeContactInfoDialogProps) {
  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Trigger>
        <Button>Update</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header borderBottom={2} borderColor='base100'>
            <HStack flex={1} justify='space-between' items='center'>
              <ChangeContactInfoHeader name={name} value={value} />
            </HStack>
          </Dialog.Header>
          <Dialog.Body direction='vertical'>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

ChangeContactInfoDialog.displayName = 'ChangeContactInfoDialog';

export * from './support';
export default ChangeContactInfoDialog;
