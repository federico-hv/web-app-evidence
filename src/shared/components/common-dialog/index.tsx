import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import { extraBtnPadding } from '../../styles';
import { GenericProps } from '../../interfaces';
import {
  getSubComponent,
  getSubComponentExcluding,
  hasChildren,
} from '../../utilities';
import { VStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import {
  CommonDialogActionButtonProps,
  CommonDialogProps,
  CommonDialogSCNames,
} from './types';
import { Fragment } from 'react';

function CommonDialog({
  isOpen,
  onOpen,
  onClose,
  children,
  minHeight = 500,
}: CommonDialogProps) {
  const { width, height } = useWindowSize();

  const Header = getSubComponent<CommonDialogSCNames>(
    children,
    'CommonDialogHeader',
  );
  const Content = getSubComponent<CommonDialogSCNames>(
    children,
    'CommonDialogContent',
  );
  const ActionButton = getSubComponent<CommonDialogSCNames>(
    children,
    'CommonDialogActionButton',
  );
  const Trigger = getSubComponent<CommonDialogSCNames>(
    children,
    'CommonDialogTrigger',
  );

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      {hasChildren(Trigger) && <Dialog.Trigger>{Trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          position='relative'
          w={{ '@bp1': width, '@bp3': '90vw' }}
          maxWidth={500}
          minHeight={minHeight}
          h={{ '@bp1': height, '@bp3': 1 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 4 }}
          css={{
            backgroundColor: '#FFF',
          }}
        >
          <Dialog.Header
            borderBottom={1}
            borderColor='base100'
            position='sticky'
            t={0}
            bgColor='clearTint500'
            justify='space-between'
            css={{
              blur: '12px',
              '@bp1': {
                paddingLeft: '$2',
                paddingRight: '$2',
              },
              '@bp3': {
                paddingLeft: '$4',
                paddingRight: '$4',
              },
            }}
          >
            <Dialog.Close css={{ zIndex: 10 }}>
              {width && width > 768 && <CloseButton variant='ghost' />}
              {width && width <= 768 && (
                <IconButton
                  icon='arrow-left-outline'
                  ariaLabel='go back'
                  variant='ghost'
                />
              )}
            </Dialog.Close>
            {Header}
          </Dialog.Header>
          <Dialog.Body items='center' px={0}>
            <VStack w='100%' mt={6} h='100%' justify='space-between'>
              {Content}
              {hasChildren(ActionButton) && (
                <Box
                  w='100%'
                  borderTop={1}
                  borderColor='base100'
                  position='fixed'
                  p={4}
                  l={0}
                  b={0}
                  zIndex={10}
                  css={{ backgroundColor: '#FFF' }}
                >
                  {ActionButton}
                </Box>
              )}
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function CommonDialogTrigger({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
CommonDialogTrigger.displayName = 'CommonDialogTrigger';

function CommonDialogHeader({
  children,
  label,
}: GenericProps & { label?: string }) {
  const ActionButton = getSubComponent<CommonDialogSCNames>(
    children,
    'CommonDialogActionButton',
  );

  const Others = getSubComponentExcluding<CommonDialogSCNames>(children, [
    'CommonDialogActionButton',
  ]);

  return (
    <Fragment>
      <HStack
        position='absolute'
        l={0}
        t={0}
        w='100%'
        h='100%'
        items='center'
        justify={'center'}
      >
        {children ? (
          <Fragment>{Others}</Fragment>
        ) : (
          <Heading
            casing='uppercase'
            as='h2'
            size={{ '@bp1': 3, '@bp3': 4 }}
          >
            {label}
          </Heading>
        )}
      </HStack>
      <Box>{ActionButton}</Box>
    </Fragment>
  );
}
CommonDialogHeader.displayName = 'CommonDialogHeader';

function CommonDialogContent({ children, ...props }: VStackProps) {
  return (
    <VStack
      w='100%'
      px={{ '@bp1': 3, '@bp3': 4 }}
      gap={{ '@bp1': 4, '@bp3': 5 }}
      {...props}
    >
      {children}
    </VStack>
  );
}
CommonDialogContent.displayName = 'CommonDialogContent';

function CommonDialogActionButton({
  label,
  onClick,
  loading,
  loadingText,
}: CommonDialogActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={extraBtnPadding()}
      fullWidth
      loadingText={loading ? '' : loadingText}
      isLoading={loading}
    >
      {label}
    </Button>
  );
}
CommonDialogActionButton.displayName = 'CommonDialogActionButton';

export {
  CommonDialogHeader,
  CommonDialogContent,
  CommonDialogActionButton,
  CommonDialogTrigger,
};

export default CommonDialog;
