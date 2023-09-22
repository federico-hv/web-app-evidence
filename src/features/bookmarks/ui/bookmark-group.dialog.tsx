import { useDialogContext } from '../../../shared';
import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
} from '@holdr-ui/react';
import CreateBookmarkGroup, {
  CreateBookmarkGroupTrigger,
} from './create-bookmark-group';
import BookmarkGroupOptionsList from './bookmark-group-options.list';

function BookmarkGroupDialog() {
  const { isOpen, onOpen, onClose } = useDialogContext();

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content w={425} css={{ backgroundColor: '#FFF' }}>
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
              position='absolute'
              l={40}
              r={0}
              p={4}
              css={{
                zIndex: -1,
              }}
            >
              <Heading as='h1' casing='uppercase' size={3} weight={500}>
                Bookmark groups
              </Heading>
            </HStack>
            <CreateBookmarkGroup>
              <CreateBookmarkGroupTrigger>
                <Button rightIcon='add'>Create</Button>
              </CreateBookmarkGroupTrigger>
            </CreateBookmarkGroup>
          </Dialog.Header>
          <Dialog.Body>
            <BookmarkGroupOptionsList />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
BookmarkGroupDialog.displayName = 'BookmarkGroupDialog';

export default BookmarkGroupDialog;
