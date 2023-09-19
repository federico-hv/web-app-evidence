import {
  isInputDisabled,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useDialogContext,
} from '../../../shared';
import { useFormikContext } from 'formik';
import { ICreateBookmarkGroup } from '../../../features';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Switch,
  VStack,
} from '@holdr-ui/react';
import { FormEvent } from 'react';

function CreateBookmarkGroupDialog() {
  const { isOpen, onClose, onOpen } = useDialogContext();

  const { handleSubmit, values, errors, getFieldHelpers } =
    useFormikContext<ICreateBookmarkGroup>();

  const { setValue: setNameValue } = getFieldHelpers('name');
  const { setValue: setIsPrivateValue } = getFieldHelpers('isPrivate');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Dialog.Trigger>
        <IconButton
          role='button'
          variant='ghost'
          icon='add'
          ariaLabel='Create bookmark group'
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          as='form'
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          css={{ backgroundColor: '#FFF', borderRadius: '25px' }}
          h={250}
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
                Create new group
              </Heading>
            </HStack>
            <Button
              type='submit'
              disabled={isInputDisabled(values, errors, [
                'name',
                'isPrivate',
              ])}
            >
              Save
            </Button>
          </Dialog.Header>
          <Dialog.Body h='100%'>
            <VStack gap={5} h='100%' pt={4} px={3}>
              <Box>
                <FormControl>
                  <Input
                    autoFocus
                    onChange={(e) => setNameValue(e.target.value)}
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
              <HStack>
                <TextGroup>
                  <TextGroupHeading as='h2' size={3}>
                    Public
                  </TextGroupHeading>
                  <TextGroupSubheading size={2} color='base400'>
                    Anyone will be able to view this bookmark group on your
                    profile
                  </TextGroupSubheading>
                </TextGroup>
                <Switch
                  name='isPrivate'
                  onChange={() => setIsPrivateValue(!values.isPrivate)}
                  defaultChecked={false}
                  value={`${!values.isPrivate}`}
                  checked={!values.isPrivate}
                />
              </HStack>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
CreateBookmarkGroupDialog.displayName = 'CreateBookmarkGroupDialog';

export default CreateBookmarkGroupDialog;
