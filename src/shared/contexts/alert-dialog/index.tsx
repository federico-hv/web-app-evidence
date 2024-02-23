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
import { GenericProps } from '../../interfaces';
import { extraBtnPadding } from '../../styles';
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
              zIndex={10}
              h={{ '@bp1': 275, '@bp3': 225 }}
              w={{ '@bp1': '90vw', '@bp3': 400 }}
              css={{
                backgroundColor: '#1A1A29',
              }}
            >
              <Dialog.Header
                css={{
                  backgroundColor: '#1A1A29',
                }}
              >
                <Heading
                  id='alert-dialog__heading'
                  as='h2'
                  weight={600}
                  size={{ '@bp1': 2, '@bp3': 3 }}
                  casing='uppercase'
                >
                  {current.title}
                </Heading>
              </Dialog.Header>
              <Dialog.Body pt={5} px={0} color='white500'>
                <VStack
                  gap={4}
                  px={4}
                  divider={<Box borderBottom={1} borderColor='base700' />}
                >
                  <Text size={{ '@bp1': 2, '@bp3': 3 }}>
                    {current.description}
                  </Text>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer
                gap={4}
                direction={{ '@bp1': 'vertical', '@bp3': 'horizontal' }}
              >
                <Button
                  colorTheme='base100'
                  onClick={close}
                  variant='ghost'
                  fullWidth
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
                  className={extraBtnPadding()}
                >
                  {current.cancelText || 'Close'}
                </Button>
                <Button
                  colorTheme='white500'
                  onClick={action}
                  fullWidth
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
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
