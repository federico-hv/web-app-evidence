import { createContext, useState } from 'react';
import {
  Text,
  Button,
  Dialog,
  Heading,
  useDisclosure,
  CloseButton,
} from '@holdr-ui/react';
import { AlertDialogContextState, IAlertDialogContext } from './types';
import { GenericProps } from '../../interfaces';
import { makeButtonLarger } from '../../styles';
import { dummyFn } from '../../utilities';

const AlertDialogContext = createContext<IAlertDialogContext>({
  current: undefined,
  set: () => {
    console.log('set');
  },
  onClose: dummyFn,
  onOpen: dummyFn,
  isOpen: false,
});

function AlertDialogProvider({ children }: GenericProps) {
  const [current, set] = useState<AlertDialogContextState>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const action = () => {
    if (current?.onAction) {
      current.onAction();
    }
    onClose();
  };

  const close = () => {
    if (current?.onCancel) {
      current.onCancel();
    }
    onClose();
  };

  return (
    <>
      <AlertDialogContext.Provider
        value={{ set: set, current: current, onOpen, onClose, isOpen }}
      >
        {children}
      </AlertDialogContext.Provider>
      {/* change to alert dialog*/}
      {current && (
        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          ariaDescribedBy='alert-dialog__heading'
        >
          <Dialog.Portal>
            <Dialog.Overlay zIndex={10} bgColor='darkTint500' />
            <Dialog.Content
              position='relative'
              radius={2}
              zIndex={10}
              bgColor='rgb(48, 48, 75)'
              minWidth={500}
              p='48px'
            >
              <Dialog.Header
                position='absolute'
                t={12}
                r={0}
                px='12px'
                py={0}
                justify='flex-end'
              >
                <CloseButton
                  onClick={close}
                  variant='ghost'
                  colorTheme='white500'
                />
              </Dialog.Header>
              <Dialog.Body gap={6} color='white500' px={0} py={0}>
                <Heading
                  id='alert-dialog__heading'
                  as='h2'
                  weight={500}
                  size={6}
                >
                  {current.title}
                </Heading>
                <Text size={{ '@bp1': 2, '@bp3': 3 }}>
                  {current.description}
                </Text>
              </Dialog.Body>
              <Dialog.Footer
                gap={2}
                mt={8}
                direction={{ '@bp1': 'vertical', '@bp3': 'horizontal' }}
                px={0}
                py={0}
              >
                <Button
                  autoFocus
                  tabIndex={0}
                  css={{ px: '28px' }}
                  radius={1}
                  colorTheme='purple500'
                  onClick={action}
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
                  className={makeButtonLarger('2.75rem')}
                >
                  {current.actionText}
                </Button>
                <Button
                  css={{ px: '28px' }}
                  radius={1}
                  colorTheme='white700'
                  onClick={close}
                  variant='ghost'
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
                  className={makeButtonLarger('2.75rem')}
                >
                  {current.cancelText || 'Close'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </>
  );
}

export { AlertDialogContext, AlertDialogProvider };
export type { AlertDialogContextState };
