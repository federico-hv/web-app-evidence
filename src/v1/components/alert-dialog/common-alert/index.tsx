import { AlertDialog, Heading } from '@holdr-ui/react';
import { CommonAlertProps } from './types';

function CommonAlertDialog({
  description,
  actionText,
  heading,
  onAction,
  variant = 'destructive',
  children,
}: CommonAlertProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
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
            <AlertDialog.Action
              onClick={onAction}
              colorTheme={
                variant === 'informational' ? 'base800' : 'danger'
              }
            >
              {actionText}
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
CommonAlertDialog.displayName = 'DestructiveAlertDialog';

export default CommonAlertDialog;
