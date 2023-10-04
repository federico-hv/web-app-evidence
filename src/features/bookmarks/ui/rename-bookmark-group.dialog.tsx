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
          css={{
            backgroundColor: '#FFF',
            '@bp1': { borderRadius: '16px' },
            '@bp3': { borderRadius: '25px' },
          }}
          h={200}
        >
          <Dialog.Header
            p={{ '@bp1': 2, '@bp3': 4 }}
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{ backgroundColor: '#FFF' }}
          >
            <Dialog.Close>
              <CloseButton type='button' variant='ghost' />
            </Dialog.Close>
            <HStack
              justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
              position='absolute'
              l={{ '@bp1': 24, '@bp3': 0 }}
              r={0}
              p={4}
              css={{
                zIndex: -1,
              }}
            >
              <Heading
                as='h1'
                size={{ '@bp1': 3, '@bp3': 4 }}
                weight={500}
              >
                Rename group
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
            <VStack
              gap={5}
              h='100%'
              pt={{ '@bp1': 0, '@bp3': 4 }}
              px={{ '@bp1': 0, '@bp3': 3 }}
            >
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
