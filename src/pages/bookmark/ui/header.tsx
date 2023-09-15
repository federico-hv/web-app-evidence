import {
  Box,
  Button,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import {
  DialogContextProvider,
  Menu,
  useAlertDialog,
  useDialogContext,
} from '../../../shared';
import { useSuspenseQuery } from '@apollo/client';
import { GET_BOOKMARK_GROUP, IBookmarkGroup } from '../../../features';
import { Fragment } from 'react';

function RenameBookmarkGroupDialog() {
  const { isOpen, onOpen, onClose } = useDialogContext();
  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          css={{ backgroundColor: '#FFF', borderRadius: '25px' }}
          h={200}
        >
          <Dialog.Header
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{ backgroundColor: '#FFF' }}
          >
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
                Rename group
              </Heading>
            </HStack>
            <Button disabled={true}>Save</Button>
          </Dialog.Header>
          <Dialog.Body h='100%'>
            <VStack gap={4} justify='center' h='100%' pb={7}>
              <Box>
                <FormControl>
                  <Input variant='flushed' placeholder='Group Name' />
                  <FormControl.HelperText>0 / 60</FormControl.HelperText>
                </FormControl>
              </Box>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { openWith } = useAlertDialog();

  const params = useParams();

  const { data } = useSuspenseQuery<
    { bookmarkGroup: IBookmarkGroup },
    { id: string }
  >(GET_BOOKMARK_GROUP, {
    variables: {
      id: params.id || '',
    },
  });

  return (
    <Fragment>
      <HStack
        w='100%'
        as='header'
        p={4}
        h={58}
        borderBottom={2}
        borderColor='base100'
        items='center'
        justify='space-between'
        position='sticky'
        t={65}
        css={{
          backgroundColor: '#FFF',
          zIndex: 10,
        }}
      >
        <Heading as='h2' size={4}>
          {data.bookmarkGroup.name}
        </Heading>
        <Menu>
          <Menu.Trigger />
          <Menu.Header>{data.bookmarkGroup.name}</Menu.Header>
          <Menu.Content>
            <Menu.Item icon='edit-box-outline' action={onOpen}>
              Rename group
            </Menu.Item>
            <Menu.Item
              icon='close'
              dangerous
              action={() =>
                openWith({
                  actionText: 'Remove',
                  title: 'Remove bookmark group',
                  description:
                    'Removing this bookmark group will remove all bookmarks in the group. Are you sure you want to remove the group?',
                })
              }
            >
              Remove group
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </HStack>
      <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
        <RenameBookmarkGroupDialog />
      </DialogContextProvider>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
