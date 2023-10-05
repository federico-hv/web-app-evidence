import {
  GenericProps,
  isInputDisabled,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { useFormikContext } from 'formik';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  Switch,
  VStack,
} from '@holdr-ui/react';
import { FormEvent } from 'react';
import { ICreateBookmarkGroup } from '../../shared';

function CreateBookmarkGroupDialog({
  children,
  isOpen,
  onClose,
  onOpen,
}: GenericProps & {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}) {
  const { handleSubmit, values, errors, getFieldHelpers } =
    useFormikContext<ICreateBookmarkGroup>();

  const { setValue: setNameValue } = getFieldHelpers('name');
  const { setValue: setIsPrivateValue } = getFieldHelpers('isPrivate');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          as='form'
          w={{ '@bp1': '95vw', '@bp3': 450 }}
          h={{ '@bp1': 225, '@bp3': 250 }}
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          css={{
            backgroundColor: '#FFF',
            '@bp1': { borderRadius: '16px' },
            '@bp3': { borderRadius: '25px' },
          }}
        >
          <Dialog.Header
            p={{ '@bp1': 3, '@bp3': 4 }}
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{
              backgroundColor: '#FFF',
            }}
          >
            <Dialog.Close>
              <CloseButton type='button' variant='ghost' />
            </Dialog.Close>
            <HStack
              justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
              position='absolute'
              l={{ '@bp1': 30, '@bp3': 0 }}
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
                Create group
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
                  <TextGroupHeading
                    as='h2'
                    size={{ '@bp1': 2, '@bp3': 3 }}
                  >
                    Public
                  </TextGroupHeading>
                  <TextGroupSubheading
                    size={{ '@bp1': 1, '@bp3': 2 }}
                    color='base400'
                  >
                    Anyone will be able to view this bookmark group on your
                    profile
                  </TextGroupSubheading>
                </TextGroup>
                <Switch
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
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
