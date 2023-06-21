import { AlertDialog, Button, Heading } from '@holdr-ui/react';

interface DestructiveAlertDialogProps {
  description: string;
  actionText: string;
  heading: string;
  buttonText: string;
}

function DestructiveAlertDialog({
  description,
  actionText,
  heading,
  buttonText,
}: DestructiveAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant='ghost' colorTheme='danger'>
          {buttonText}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>
            <Heading as='h4' size={3}>
              {heading}
            </Heading>
          </AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel variant='ghost'>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action colorTheme='danger'>
              {actionText}
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
DestructiveAlertDialog.displayName = 'DestructiveAlertDialog';

export default DestructiveAlertDialog;
