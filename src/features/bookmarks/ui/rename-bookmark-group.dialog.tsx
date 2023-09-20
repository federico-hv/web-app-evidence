import { isInputDisabled, useDialogContext } from '../../../shared';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  VStack,
} from '@holdr-ui/react';
import { useFormikContext } from 'formik';
import { FormEvent } from 'react';
import { IUpdateBookmarkGroup } from '../shared';

function RenameBookmarkGroupDialog() {
  const { isOpen, onOpen, onClose } = useDialogContext();

  const { handleSubmit, values, errors, getFieldHelpers } =
    useFormikContext<IUpdateBookmarkGroup>();

  const { setValue } = getFieldHelpers('name');

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          as='form'
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          css={{ backgroundColor: '#FFF', borderRadius: '25px' }}
          h={200}
        >
          <Dialog.Header
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{ backgroundColor: '#FFF' }}
          >
            <Dialog.Close>
              <CloseButton type='button' variant='ghost' />
            </Dialog.Close>
            <HStack
              justify='center'
              position='absolute'
              l={0}
              r={0}
              p={4}
              css={{
                zIndex: -1,
              }}
            >
              <Heading as='h1' size={4} weight={500}>
                Rename bookmark group
              </Heading>
            </HStack>
            <Button
              type='submit'
              disabled={isInputDisabled(values, errors, ['name'])}
            >
              Save
            </Button>
          </Dialog.Header>
          <Dialog.Body h='100%'>
            <VStack gap={4} justify='center' h='100%' pb={6} px={3}>
              <Box>
                <FormControl>
                  <Input
                    autoFocus
                    onChange={(e) => setValue(e.target.value)}
                    name={values.name}
                    value={values.name}
                    type='text'
                    maxLength={60}
                    variant='flushed'
                    placeholder='Group Name'
                  />
                  <FormControl.HelperText>
                    {values.name.length} / 60
                  </FormControl.HelperText>
                </FormControl>
              </Box>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
RenameBookmarkGroupDialog.displayName = 'RenameBookmarkGroupDialog';

export default RenameBookmarkGroupDialog;
