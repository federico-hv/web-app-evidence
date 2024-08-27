import { useFeedContext } from '../../shared';
import { useRelationshipStatusInfo } from '../../../relationships';
import {
  Asset,
  DialogContextProvider,
  Menu,
  useAlertDialog,
} from '../../../../shared';
import { IconButton, Image, useDisclosure } from '@holdr-ui/react';
import { Fragment } from 'react';
import { AudienceDialog } from '../dialogs';
import {
  useDeleteFeedMutation,
  usePinFeedMutation,
  useUnpinFeedMutation,
} from '../../mutations';

function FeedOwnerMoreButton({ ghost }: { ghost?: boolean }) {
  const { openWith } = useAlertDialog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { owner, isPinned, feedId } = useFeedContext();

  const { data } = useRelationshipStatusInfo(owner.username);

  const { pin } = usePinFeedMutation();
  const { unpin } = useUnpinFeedMutation();
  const { deleteFeed } = useDeleteFeedMutation();

  return (
    <Fragment>
      <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
        {data && (
          <Menu>
            <Menu.Trigger>
              <IconButton
                size={{ '@bp1': 'sm', '@bp3': 'base' }}
                colorTheme='darkTint400'
                variant={ghost ? 'filled' : 'ghost'}
                blur='xl'
                icon='more-fill'
                boxShadow='none'
                ariaLabel='view options'
                css={{
                  color: '$white500',
                }}
              />
            </Menu.Trigger>

            <Menu.Header />
            <Menu.Content>
              <Menu.Item
                icon={
                  <Image
                    alt=''
                    key={
                      isPinned
                        ? Asset.Icon.PinFilled
                        : Asset.Icon.PinOutlined
                    }
                    size={20}
                    src={
                      isPinned
                        ? Asset.Icon.PinFilled
                        : Asset.Icon.PinOutlined
                    }
                  />
                }
                action={
                  isPinned
                    ? async () => await unpin(feedId)
                    : async () => await pin(feedId)
                }
                label={isPinned ? 'Unpin from feeds' : 'Pin to feeds'}
              />
              <Menu.Item
                icon='eye-show'
                label='Change audience'
                action={onOpen}
              />
              {/*<Menu.Item*/}
              {/*  icon={<Image size={24} src={stats} />}*/}
              {/*  label='View analytics'*/}
              {/*/>*/}
              <Menu.Item
                dangerous
                icon='remove-outline'
                label='Delete'
                action={() =>
                  openWith({
                    actionText: 'Yes, delete',
                    onAction: async () => {
                      await deleteFeed(feedId);
                    },
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
