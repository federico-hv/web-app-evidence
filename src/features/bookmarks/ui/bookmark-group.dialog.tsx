import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  useDialogContext,
} from '../../../shared';
import { Button, Heading, HStack } from '@holdr-ui/react';
import CreateBookmarkGroup, {
  CreateBookmarkGroupTrigger,
} from './create-bookmark-group';
import BookmarkGroupOptionsList from './bookmark-group-options.list';

function BookmarkGroupDialog() {
  const dialogContext = useDialogContext();

  return (
    <CommonDialog {...dialogContext}>
      <CommonDialogHeader>
        <HStack
          items='center'
          justify='space-between'
          position='absolute'
          l={{
            '@bp1': 32,
            '@bp3': 'calc(32px + 1rem)',
          }}
          w='calc(100% - (32px + 0.25rem))'
          pl={3}
        >
          <Heading
            as='h1'
            casing='uppercase'
            size={{ '@bp1': 2, '@bp3': 3 }}
            weight={500}
          >
            Bookmark groups
          </Heading>
          <CreateBookmarkGroup>
            <CreateBookmarkGroupTrigger>
              <Button rightIcon='add'>Create</Button>
            </CreateBookmarkGroupTrigger>
          </CreateBookmarkGroup>
        </HStack>
      </CommonDialogHeader>
      <CommonDialogContent>
        <BookmarkGroupOptionsList />
      </CommonDialogContent>
    </CommonDialog>
  );
}
BookmarkGroupDialog.displayName = 'BookmarkGroupDialog';

export default BookmarkGroupDialog;
