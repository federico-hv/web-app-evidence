import { createContext, useState } from 'react';
import {
  Text,
  Box,
  Button,
  Dialog,
  Heading,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';

import { AlertDialogContextState, IAlertDialogContext } from './types';
import { GenericProps } from '../../interface';
import { extraBtnPadding } from '../../styles';
import { dummyFn } from '../../utilities';

const AlertDialogContext = createContext<IAlertDialogContext>({
  current: undefined,
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
            <Dialog.Overlay />
            <Dialog.Content
              h={{ '@bp1': 325, '@bp3': 225 }}
              w={{ '@bp1': '90vw', '@bp3': 400 }}
            >
              <Dialog.Body pt={5}>
                <VStack
                  gap={4}
                  px={2}
                  divider={<Box borderBottom={1} borderColor='base100' />}
                >
                  <Heading
                    id='alert-dialog__heading'
                    as='h2'
                    size={3}
                    casing='uppercase'
                  >
                    {current.title}
                  </Heading>
                  <Text>{current.description}</Text>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer
                gap={4}
                direction={{ '@bp1': 'vertical', '@bp3': 'horizontal' }}
              >
                <Button
                  onClick={close}
                  variant='ghost'
                  fullWidth
                  className={extraBtnPadding()}
                >
                  {current.cancelText || 'Close'}
                </Button>
                <Button
                  onClick={action}
                  fullWidth
                  className={extraBtnPadding()}
                >
                  {current.actionText}
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
