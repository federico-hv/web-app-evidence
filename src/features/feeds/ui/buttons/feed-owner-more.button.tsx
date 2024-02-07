import {
  useDeleteFeed,
  useFeedContext,
  usePinFeed,
  useUnpinFeed,
} from '../../shared';
import { useRelationshipStatusInfo } from '../../../relationships';
import {
  DialogContextProvider,
  Menu,
  useAlertDialog,
} from '../../../../shared';
import { IconButton, Image, useDisclosure } from '@holdr-ui/react';
import { Fragment } from 'react';
import { AudienceDialog } from '../dialogs';

import stats from '../../../../assets/images/stats.png';
import pinOutlined from '../../../../assets/images/pin-outlined.png';
import pinFilled from '../../../../assets/images/pin-filled.png';

function FeedOwnerMoreButton({}: { ghost?: boolean }) {
  const { openWith } = useAlertDialog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { owner, isPinned, feedId } = useFeedContext();

  const { data } = useRelationshipStatusInfo(owner.username);

  const { pin } = usePinFeed();
  const { unpin } = useUnpinFeed();
  const { deleteFeed } = useDeleteFeed();

  return (
    <Fragment>
      <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
        {data && (
          <Menu>
            <Menu.Trigger>
              <IconButton
                variant='ghost'
                size={{ '@bp1': 'sm', '@bp3': 'base' }}
                colorTheme='white50'
                blur='xl'
                icon='more-fill'
                boxShadow='none'
                ariaLabel='view options'
              />
            </Menu.Trigger>

            <Menu.Header />
            <Menu.Content>
              <Menu.Item
                icon={
                  <Image
                    size={24}
                    src={isPinned ? pinFilled : pinOutlined}
                  />
                }
                action={
                  isPinned
                    ? async () => await unpin(feedId)
                    : async () => await pin(feedId)
                }
                label={isPinned ? 'Unpin from profile' : 'Pin to profile'}
              />
              <Menu.Item
                icon='eye-show'
                label='Change audience'
                action={onOpen}
              />
              <Menu.Item
                icon={<Image size={24} src={stats} />}
                label='View analytics'
              />
              <Menu.Item
                dangerous
                icon='remove-outline'
                label='Delete'
                action={() =>
                  openWith({
                    actionText: 'Yes, delete',
                    onAction: async () => await deleteFeed(feedId),
                    title: 'Delete feed',
                    description:
                      'If you delete this feed, you will you will lose all the data associated with this feed.' +
                      ' Are you sure you want to delete it?',
                  })
                }
              />
            </Menu.Content>
          </Menu>
        )}
        <AudienceDialog />
      </DialogContextProvider>
    </Fragment>
  );
}
FeedOwnerMoreButton.displayName = 'OwnerMoreButton';

export default FeedOwnerMoreButton;
